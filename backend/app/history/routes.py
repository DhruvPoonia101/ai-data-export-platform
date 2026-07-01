from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.query_history import QueryHistory

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.get("/")
def get_history(
    db: Session = Depends(get_db)
):

    history = (
        db.query(QueryHistory)
        .order_by(QueryHistory.executed_at.desc())
        .all()
    )

    return history