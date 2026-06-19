from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.source import (
    DataSourceCreate
)

from app.data_sources.repository import (
    create_data_source,
    get_all_sources
)

router = APIRouter(
    prefix="/data-sources",
    tags=["Data Sources"]
)


@router.post("/")
def add_source(
    source: DataSourceCreate,
    db: Session = Depends(get_db)
):
    return create_data_source(
        db,
        source
    )


@router.get("/")
def list_sources(
    db: Session = Depends(get_db)
):
    return get_all_sources(
        db
    )