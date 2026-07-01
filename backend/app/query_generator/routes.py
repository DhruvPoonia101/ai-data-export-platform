from fastapi import APIRouter

from app.query_generator.executor import execute_sql

from app.schemas.query import QueryRequest

router = APIRouter(
    prefix="/query-generator",
    tags=["Query Generator"]
)


@router.post("/generate")
def generate_query(
    request: QueryRequest
):

    prompt = request.prompt.lower()

    if "users" in prompt:
        sql = "SELECT * FROM users;"

    elif "data sources" in prompt:
        sql = "SELECT * FROM data_sources;"

    else:
        sql = "-- Unable to generate SQL"

    return {
        "generated_sql": sql
    }


@router.post("/execute")
def execute_query(
    request: QueryRequest
):

    sql = request.prompt

    results = execute_sql_query(sql)

    return {
        "results": results
    }