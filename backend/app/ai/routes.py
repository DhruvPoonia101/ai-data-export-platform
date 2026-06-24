from fastapi import APIRouter

from app.core.ai_service import ask_ai

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