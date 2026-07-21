from sqlalchemy.orm import Session

from services.auth_service.app.models.user import User
from services.auth_service.app.schemas.user import UserCreate
from services.auth_service.app.utils.security import hash_password
from fastapi import HTTPException

from fastapi.security import OAuth2PasswordRequestForm
from services.auth_service.app.utils.security import verify_password

from services.auth_service.app.utils.jwt import create_access_token


def register_user(user: UserCreate, db: Session):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password_hash=hash_password(user.password),
        role=user.role,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "role": new_user.role,
    }


def login_user(form_data: OAuth2PasswordRequestForm, db: Session):

    existing_user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    if not verify_password(form_data.password, existing_user.password_hash):
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    token = create_access_token(
        {
            "id": existing_user.id,
            "sub": existing_user.email,
            "role": existing_user.role,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": existing_user.role,
    }


def get_all_users(db: Session):
    return db.query(User).order_by(User.created_at.desc()).all()


def get_users_by_role(role: str, db: Session):
    return db.query(User).filter(User.role == role).order_by(User.full_name).all()
