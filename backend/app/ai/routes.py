from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.query import QueryRequest
from app.core.ai_service import ask_ai
from app.query_generator.prompt_builder import build_prompt
from app.query_generator.validator import validate_sql
from app.query_generator.executor import execute_sql
from app.query_generator.connection import build_connection_string

from app.database.connection import get_db
from app.models.source import DataSource

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.get("/test")
def test_ai():

    response = ask_ai(
        "Say hello from Gemini"
    )

    return {
        "response": response
    }


@router.get("/prompt-test")
def prompt_test():

    schema = {
        "users": {
            "id": "integer",
            "email": "varchar"
        }
    }

    prompt = build_prompt(
        schema,
        "Show all users"
    )

    return {
        "prompt": prompt
    }


@router.post("/generate-sql")
def generate_sql(
    request: QueryRequest,
    db: Session = Depends(get_db)
):

    schema = {
        "users": {
            "id": "integer",
            "email": "varchar"
        }
    }

    prompt = build_prompt(
        schema,
        request.question
    )

    sql = ask_ai(prompt)

    print("Generated SQL:", sql)

    is_safe = validate_sql(sql)

    if not is_safe:
        return {
            "error": "Unsafe SQL blocked"
        }

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
    print("Using Database:", source.database_name)
    print("Host:", source.host)
    print("Port:", source.port)
    print("Selected Data Source:", source.database_name)
    print("Connection String:", connection_string)

    result = execute_sql(
        connection_string=connection_string,
        sql=sql,
        page=request.page,
        page_size=request.page_size
    )

    return {
        "success": True,
        "generated_sql": sql,
        "columns": result["columns"],
        "rows": result["rows"],
        "total_rows": result["total_rows"],
        "page": result["page"],
        "page_size": result["page_size"],
        "total_pages": result["total_pages"]
    }