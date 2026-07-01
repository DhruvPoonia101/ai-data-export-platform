from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session

import pandas as pd
import uuid
import os

from app.database.connection import get_db
from app.models.source import DataSource
from app.query_generator.connection import build_connection_string
from app.core.audit_logger import log_event

router = APIRouter(
    prefix="/exports",
    tags=["Exports"]
)


@router.post("/csv")
def export_csv(
    data: dict,
    db: Session = Depends(get_db)
):

    sql = data.get("sql", "").strip().rstrip(";")

    source = (
        db.query(DataSource)
        .order_by(DataSource.id.desc())
        .first()
    )

    if not source:
        return {
            "error": "No data source found"
        }

    connection_string = build_connection_string(source)

    engine = create_engine(connection_string)

    with engine.connect() as conn:

        result = conn.execute(text(sql))

        rows = result.fetchall()

        columns = result.keys()

    dataframe = pd.DataFrame(
        rows,
        columns=columns
    )

    os.makedirs("exports", exist_ok=True)

    filename = f"exports/{uuid.uuid4()}.csv"

    dataframe.to_csv(
    filename,
    index=False
)

    log_event(
    db,
    "EXPORT_CSV"
)

    return FileResponse(
    path=filename,
    filename="query_results.csv",
    media_type="text/csv"
)

@router.post("/excel")
def export_excel(
    data: dict,
    db: Session = Depends(get_db)
):

    sql = data.get("sql", "").strip().rstrip(";")

    source = (
        db.query(DataSource)
        .order_by(DataSource.id.desc())
        .first()
    )

    if not source:
        return {
            "error": "No data source found"
        }

    connection_string = build_connection_string(source)

    engine = create_engine(connection_string)

    with engine.connect() as conn:

        result = conn.execute(text(sql))

        rows = result.fetchall()

        columns = result.keys()

    dataframe = pd.DataFrame(
        rows,
        columns=columns
    )

    os.makedirs("exports", exist_ok=True)

    filename = f"exports/{uuid.uuid4()}.xlsx"

    dataframe.to_excel(
    filename,
    index=False
)

    log_event(
        db,
        "EXPORT_EXCEL"
)

    return FileResponse(
    path=filename,
    filename="query_results.xlsx",
    media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
)