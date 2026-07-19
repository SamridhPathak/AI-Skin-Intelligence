from pydantic import BaseModel, EmailStr
from typing import Literal

# Open registration: any of these roles can be chosen at signup.
# If you later want to lock consultant/dermatologist/admin behind
# admin-only creation instead, swap this for role: str = "user"
# and add a separate POST /admin/users endpoint.
RoleType = Literal["user", "consultant", "dermatologist", "admin"]


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: RoleType = "user"


class UserLogin(BaseModel):
    email: EmailStr
    password: str
