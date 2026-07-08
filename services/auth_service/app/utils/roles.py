from fastapi import Depends, HTTPException

from services.auth_service.app.utils.dependencies import get_current_user


def require_role(role: str):

    def role_checker(current_user=Depends(get_current_user)):

        if current_user["role"] != role:
            raise HTTPException(
                status_code=403,
                detail="Access Denied"
            )

        return current_user

    return role_checker