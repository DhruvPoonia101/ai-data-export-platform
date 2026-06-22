from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.source import (
    DataSourceCreate
)

from app.data_sources.repository import (
    create_data_source,
    get_all_sources,
    update_data_source,
    delete_data_source,
    test_connection
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

@router.put("/{source_id}")
def update_source(
    source_id: int,
    source: DataSourceCreate,
    db: Session = Depends(get_db)
):
    updated_source = update_data_source(
        db,
        source_id,
        source
    )

    if not updated_source:
        return {
            "message": "Data Source Not Found"
        }

    return updated_source

@router.delete("/{source_id}")
def remove_source(
    source_id: int,
    db: Session = Depends(get_db)
):
    deleted = delete_data_source(
        db,
        source_id
    )

    if not deleted:
        return {
            "message": "Data Source Not Found"
        }

    return {
        "message": "Data Source Deleted Successfully"
    }

@router.post("/{source_id}/test")
def test_source_connection(
    source_id: int,
    db: Session = Depends(get_db)
):

    sources = get_all_sources(db)

    source = next(
        (
            s for s in sources
            if s.id == source_id
        ),
        None
    )

    if not source:
        return {
            "success": False,
            "message": "Source Not Found"
        }

    success = test_connection(
        source.host,
        source.database_name,
        source.username
    )

    if success:
        return {
            "success": True,
            "message": "Connection Successful"
        }

    return {
        "success": False,
        "message": "Connection Failed"
    }