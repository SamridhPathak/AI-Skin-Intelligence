from sqlalchemy.orm import Session
from fastapi import HTTPException

from services.profile_service.app.models.profile import Profile
from services.profile_service.app.schemas.profile import ProfileCreate


def create_profile(profile: ProfileCreate, current_user, db: Session):

    existing_profile = db.query(Profile).filter(
        Profile.user_id == current_user["id"]
    ).first()

    if existing_profile:
        raise HTTPException(
            status_code=400,
            detail="Profile already exists"
        )

    new_profile = Profile(
        user_id=current_user["id"],
        age=profile.age,
        gender=profile.gender,
        skin_type=profile.skin_type,
        skin_tone=profile.skin_tone,
        skin_concerns=profile.skin_concerns,
        allergies=profile.allergies,
        goals=profile.goals,
        water_intake=profile.water_intake,
        sleep_hours=profile.sleep_hours,
        exercise_frequency=profile.exercise_frequency,
        stress_level=profile.stress_level,
        sun_exposure=profile.sun_exposure
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return {
        "message": "Profile created successfully"
    }


def get_profile(current_user, db: Session):

    profile = db.query(Profile).filter(
        Profile.user_id == current_user["id"]
    ).first()

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return profile
