from sqlalchemy import Column, Integer, String
from app.database.base import Base


class DataSource(Base):
    __tablename__ = "data_sources"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    source_type = Column(
        String,
        nullable=False
    )

    host = Column(
        String,
        nullable=False
    )

    database_name = Column(
        String,
        nullable=False
    )

    username = Column(
        String,
        nullable=False
    )

    port = Column(Integer, nullable=False)
    password = Column(String, nullable=False)