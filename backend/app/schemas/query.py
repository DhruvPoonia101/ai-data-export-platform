from pydantic import BaseModel

class QueryRequest(BaseModel):
    question: str
    page: int = 1
    page_size: int = 10