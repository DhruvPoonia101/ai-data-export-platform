from sqlalchemy import text
from app.database.session import SessionLocal


def execute_sql_query(sql: str):

    db = SessionLocal()

    try:

        result = db.execute(text(sql))

        rows = result.fetchall()

        data = []

        for row in rows:
            data.append(
                dict(row._mapping)
            )

        return data

    finally:
        db.close()