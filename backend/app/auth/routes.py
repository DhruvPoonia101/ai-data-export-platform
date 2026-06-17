from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user
from app.schemas.user import UserRegister
from app.database.session import get_db
from app.auth.repository import (
    get_user_by_email,
    create_user
)
from app.core.security import hash_password
from app.schemas.user import UserRegister, UserLogin
from app.core.security import (
    hash_password,
    verify_password
)
from app.core.jwt_handler import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.get("/profile")
def get_profile(
    current_user=Depends(get_current_user)
):
    return {
        "message": "Protected Route Accessed",
        "user": current_user
    }


@router.post("/register")
def register_user(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    existing_user = get_user_by_email(
        db,
        user.email
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    password_hash = hash_password(
        user.password
    )

    created_user = create_user(
        db,
        user.email,
        password_hash
    )

    return {
        "message": "User registered successfully",
        "user_id": created_user.id,
        "email": created_user.email
    }

@router.post("/login")
def login_user(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    existing_user = get_user_by_email(
        db,
        user.email
    )

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        user.password,
        existing_user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {
            "sub": existing_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }