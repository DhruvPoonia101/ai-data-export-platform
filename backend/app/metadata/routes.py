from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.metadata.repository import (
    get_database_metadata
)

from app.metadata.storage import (
    extract_and_store_metadata
)

router = APIRouter(
    prefix="/metadata",
    tags=["Metadata"]
)


@router.get("/")
def get_metadata(
    db: Session = Depends(get_db)
):
    return get_database_metadata(db)    

@router.post("/extract")
def extract_metadata(
    db: Session = Depends(get_db)
):
    return extract_and_store_metadata(db)