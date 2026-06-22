from sqlalchemy.orm import Session
from app.models.source import DataSource
import psycopg2


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

def update_data_source(
    db: Session,
    source_id: int,
    source
):
    existing_source = (
        db.query(DataSource)
        .filter(DataSource.id == source_id)
        .first()
    )

    if not existing_source:
        return None

    existing_source.name = source.name
    existing_source.source_type = source.source_type
    existing_source.host = source.host
    existing_source.database_name = source.database_name
    existing_source.username = source.username

    db.commit()
    db.refresh(existing_source)

    return existing_source


def delete_data_source(
    db: Session,
    source_id: int
):
    existing_source = (
        db.query(DataSource)
        .filter(DataSource.id == source_id)
        .first()
    )

    if not existing_source:
        return False

    db.delete(existing_source)
    db.commit()

    return True
def test_connection(
    host: str,
    database_name: str,
    username: str
):

    try:

        conn = psycopg2.connect(
            host=host,
            database=database_name,
            user=username,
            password="162004"  # temporary
        )

        conn.close()

        return True

    except Exception:
        return False