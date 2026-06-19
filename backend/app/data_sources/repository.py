from sqlalchemy.orm import Session
from app.models.source import DataSource


def create_data_source(
    db: Session,
    source
):
    new_source = DataSource(
        name=source.name,
        source_type=source.source_type,
        host=source.host,
        database_name=source.database_name,
        username=source.username
    )

    db.add(new_source)
    db.commit()
    db.refresh(new_source)

    return new_source


def get_all_sources(
    db: Session
):
    return db.query(
        DataSource
    ).all()