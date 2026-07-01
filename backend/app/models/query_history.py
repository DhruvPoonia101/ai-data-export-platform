from sqlalchemy import Column, Integer, Text, DateTime
from sqlalchemy.sql import func

from app.database.base import Base


class QueryHistory(Base):

    __tablename__ = "query_history"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    question = Column(
        Text,
        nullable=False
    )

    generated_sql = Column(
        Text,
        nullable=False
    )

    executed_at = Column(
        DateTime,
        server_default=func.now()
    )