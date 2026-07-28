from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from fastapi import HTTPException

from services.assessment_service.app.models.assessment import SkinAssessment
from services.assessment_service.app.models.routine import SkincareRoutine
from services.assessment_service.app.schemas.assessment import AssessmentSubmit
from services.assessment_service.app.business.scoring_engine import calculate_skin_health_score
from services.assessment_service.app.business.concern_engine import identify_skin_concerns, get_primary_concern
from services.assessment_service.app.business.routine_engine import generate_routine_steps


def _get_consistency_stats(user_id: int, mongo_db, db: Session):
    """
    % of scheduled AM/PM steps actually completed over the last 7 days.
    No active routine yet (brand-new user) -> spec says default to 100.
    """
    active_steps = db.query(SkincareRoutine).filter(
        SkincareRoutine.user_id == user_id,
        SkincareRoutine.is_active == True,  # noqa: E712
        SkincareRoutine.time_of_day.in_(["AM", "PM"]),
    ).count()

    if active_steps == 0:
        return 0, 0  # -> scoring_engine defaults this to 100

    week_ago = (datetime.utcnow() - timedelta(days=7)).strftime("%Y-%m-%d")
    logs = list(mongo_db.routine_logs.find({
        "user_id": user_id,
        "log_date": {"$gte": week_ago},
    }))

    completed = sum(len(log.get("completed_steps", [])) for log in logs)
    expected = active_steps * 7
    return completed, expected


def evaluate_assessment(data: AssessmentSubmit, current_user, db: Session, mongo_db):
    severities = {
        "acne_severity": data.acne_severity,
        "hyperpigmentation_severity": data.hyperpigmentation_severity,
        "redness_severity": data.redness_severity,
        "wrinkles_severity": data.wrinkles_severity,
    }

    concerns = identify_skin_concerns(severities)
    primary_concern = get_primary_concern(concerns)

    completed, expected = _get_consistency_stats(current_user["id"], mongo_db, db)

    scores = calculate_skin_health_score(
        severities=severities,
        sun_exposure=data.sun_exposure,
        sleep_hours=data.sleep_hours,
        water_intake_liters=data.water_intake_liters,
        completed_logs=completed,
        total_logs=expected,
    )

    assessment = SkinAssessment(
        user_id=current_user["id"],
        skin_type=data.skin_type,
        severities=severities,
        detected_concerns=concerns,
        primary_concern=primary_concern,
        sleep_hours=data.sleep_hours,
        water_intake_liters=data.water_intake_liters,
        sun_exposure=data.sun_exposure,
        **scores,
    )
    db.add(assessment)
    db.commit()
    db.refresh(assessment)
    return assessment


def get_latest_score(current_user, db: Session):
    assessment = (
        db.query(SkinAssessment)
        .filter(SkinAssessment.user_id == current_user["id"])
        .order_by(SkinAssessment.created_at.desc())
        .first()
    )
    if not assessment:
        raise HTTPException(status_code=404, detail="No assessment found. Complete the assessment first.")
    return assessment


def generate_routine(current_user, db: Session):
    assessment = get_latest_score(current_user, db)

    redness = (assessment.severities or {}).get("redness_severity", 0)
    steps_by_time = generate_routine_steps(assessment.skin_type, redness)

    # Deactivate previous routine before writing the new one.
    db.query(SkincareRoutine).filter(
        SkincareRoutine.user_id == current_user["id"],
        SkincareRoutine.is_active == True,  # noqa: E712
    ).update({"is_active": False})

    created = []
    for time_of_day, steps in steps_by_time.items():
        for i, (category, name) in enumerate(steps, start=1):
            routine_step = SkincareRoutine(
                user_id=current_user["id"],
                assessment_id=assessment.id,
                time_of_day=time_of_day,
                step_number=i,
                step_category=category,
                step_name=name,
                is_active=True,
            )
            db.add(routine_step)
            created.append(routine_step)

    db.commit()
    for step in created:
        db.refresh(step)
    return created


def get_active_routine(current_user, db: Session, mongo_db):
    steps = (
        db.query(SkincareRoutine)
        .filter(SkincareRoutine.user_id == current_user["id"], SkincareRoutine.is_active == True)  # noqa: E712
        .order_by(SkincareRoutine.time_of_day, SkincareRoutine.step_number)
        .all()
    )

    today = datetime.utcnow().strftime("%Y-%m-%d")
    today_log = mongo_db.routine_logs.find_one({"user_id": current_user["id"], "log_date": today}) or {}
    completed_ids = {c["routine_step_id"] for c in today_log.get("completed_steps", [])}

    result = []
    for step in steps:
        result.append({
            "id": step.id,
            "time_of_day": step.time_of_day,
            "step_number": step.step_number,
            "step_category": step.step_category,
            "step_name": step.step_name,
            "is_active": step.is_active,
            "completed_today": step.id in completed_ids,
        })
    return result


def toggle_routine_log(user_id: int, routine_step_id: int, completed: bool, mongo_db):
    today = datetime.utcnow().strftime("%Y-%m-%d")

    if completed:
        mongo_db.routine_logs.update_one(
            {"user_id": user_id, "log_date": today},
            {
                "$pull": {"completed_steps": {"routine_step_id": routine_step_id}},
            },
        )
        mongo_db.routine_logs.update_one(
            {"user_id": user_id, "log_date": today},
            {
                "$push": {"completed_steps": {
                    "routine_step_id": routine_step_id,
                    "completed_at": datetime.utcnow().isoformat(),
                }},
                "$setOnInsert": {"water_intake_ml": 0, "sleep_hours": 0},
            },
            upsert=True,
        )
    else:
        mongo_db.routine_logs.update_one(
            {"user_id": user_id, "log_date": today},
            {"$pull": {"completed_steps": {"routine_step_id": routine_step_id}}},
        )

    return {"message": "Updated", "completed": completed}
