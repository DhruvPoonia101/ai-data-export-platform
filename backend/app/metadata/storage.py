from sqlalchemy import text
from sqlalchemy.orm import Session

from app.models.metadata import (
    MetadataTable,
    MetadataColumn
)


def extract_and_store_metadata(
    db: Session
):

    db.query(MetadataColumn).delete()
    db.query(MetadataTable).delete()

    db.commit()

    query = text("""
        SELECT
            table_name,
            column_name,
            data_type
        FROM information_schema.columns
        WHERE table_schema = 'public'
        ORDER BY table_name;
    """)

    result = db.execute(query)

    tables = {}

    for row in result:

        table_name = row.table_name

        if table_name not in tables:

            metadata_table = MetadataTable(
                table_name=table_name
            )

            db.add(metadata_table)
            db.commit()
            db.refresh(metadata_table)

            tables[table_name] = metadata_table.id

        metadata_column = MetadataColumn(
            table_id=tables[table_name],
            column_name=row.column_name,
            data_type=row.data_type
        )

        db.add(metadata_column)

    db.commit()

    return {
        "message": "Metadata Stored Successfully"
    }