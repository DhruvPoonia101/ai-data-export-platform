from app.database.connection import engine
from app.database.base import Base

from app.models.user import User
from app.models.source import DataSource

from app.models.metadata import (
    MetadataTable,
    MetadataColumn
)

Base.metadata.create_all(bind=engine)

print("Tables Created Successfully!")