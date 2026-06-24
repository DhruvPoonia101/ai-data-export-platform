from fastapi import APIRouter

from app.core.ai_service import ask_ai
from app.query_generator.prompt_builder import build_prompt
from app.core.ai_service import ask_ai

from app.query_generator.prompt_builder import (
    build_prompt
)

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

@router.get("/generate-sql")
def generate_sql():

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

    sql = ask_ai(prompt)

    return {
        "sql": sql
    }