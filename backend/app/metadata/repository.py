from sqlalchemy import text
from sqlalchemy.orm import Session


def get_database_metadata(
    db: Session
):

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

    metadata = {}

    for row in result:

        table_name = row.table_name
        column_name = row.column_name
        data_type = row.data_type

        if table_name not in metadata:
            metadata[table_name] = {}

        metadata[table_name][column_name] = data_type

    return metadata