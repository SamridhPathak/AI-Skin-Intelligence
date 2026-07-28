from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from services.assessment_service.app.schemas.assessment import AssessmentSubmit
from services.assessment_service.app.db.dependencies import get_db
from services.assessment_service.app.db.mongo import get_mongo_db
from services.assessment_service.app.business.assessment_service import (
    evaluate_assessment, get_latest_score,
)
from services.auth_service.app.utils.dependencies import get_current_user

router = APIRouter(prefix="/api/v1/assessment", tags=["Assessment"])


def _serialize(assessment):
    return {
        "id": assessment.id,
        "overall_score": assessment.overall_score,
        "condition_score": assessment.condition_score,
        "lifestyle_score": assessment.lifestyle_score,
        "sleep_score": assessment.sleep_score,
        "consistency_score": assessment.consistency_score,
        "hydration_score": assessment.hydration_score,
        "primary_concern": assessment.primary_concern,
        "detected_concerns": assessment.detected_concerns,
        "skin_type": assessment.skin_type,
        "created_at": assessment.created_at.isoformat() if assessment.created_at else None,
    }


@router.post("/evaluate")
def evaluate(
    data: AssessmentSubmit,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
    mongo_db=Depends(get_mongo_db),
):
    assessment = evaluate_assessment(data, current_user, db, mongo_db)
    return _serialize(assessment)


@router.get("/score")
def score(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    assessment = get_latest_score(current_user, db)
    return _serialize(assessment)
