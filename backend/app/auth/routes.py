from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.auth.repository import (
    get_user_by_email,
    create_user
)

from app.database.session import get_db

from app.schemas.user import (
    UserRegister,
    UserLogin
)

from app.core.security import (
    hash_password,
    verify_password
)

from app.core.jwt_handler import create_access_token