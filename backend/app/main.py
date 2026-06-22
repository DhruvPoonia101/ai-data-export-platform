from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth.routes import router as auth_router
from app.data_sources.routes import (
    router as data_source_router
)
from app.query_generator.routes import (
    router as query_generator_router
)

from app.metadata.routes import (
    router as metadata_router
)



app = FastAPI(
    title="AI Data Export Platform API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(data_source_router)
app.include_router(query_generator_router)
app.include_router(
    metadata_router
)

@app.get("/")
def root():
    return {
        "message": "AI Data Export Platform API"
    }