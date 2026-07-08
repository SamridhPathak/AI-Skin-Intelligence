from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from services.auth_service.app.schemas.user import UserCreate
from services.auth_service.app.db.dependencies import get_db
from services.auth_service.app.business.auth_service import register_user

from fastapi.security import OAuth2PasswordRequestForm
from services.auth_service.app.business.auth_service import login_user

from services.auth_service.app.utils.dependencies import get_current_user

from services.auth_service.app.utils.roles import require_role


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(user, db)

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    return login_user(form_data, db)

@router.get("/me")
def me(current_user=Depends(get_current_user)):
    return current_user

@router.get("/admin")
def admin_dashboard(current_user=Depends(require_role("admin"))):

    return {
        "message": "Welcome Admin"
    }