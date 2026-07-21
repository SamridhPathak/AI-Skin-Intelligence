from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Literal

# Open registration: any of these roles can be chosen at signup.
RoleType = Literal["user", "consultant", "dermatologist", "admin"]


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: RoleType = "user"


class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Safe response shape — never includes password_hash.
class UserOut(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    created_at: datetime

    class Config:
        from_attributes = True
