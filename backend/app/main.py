from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.ai.routes import router as ai_router
from app.exports.routes import router as exports_router
from app.auth.routes import router as auth_router
from app.history.routes import router as history_router
from app.data_sources.routes import (
    router as data_source_router
)
# from app.query_generator.routes import (
#     router as query_generator_router
# )

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
# app.include_router(query_generator_router)
app.include_router(metadata_router)
app.include_router(ai_router)
app.include_router(exports_router)
app.include_router(history_router)

@app.get("/")
def root():
    return {
        "message": "AI Data Export Platform API"
    }