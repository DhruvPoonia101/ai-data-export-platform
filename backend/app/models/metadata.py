from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.base import Base


class MetadataTable(Base):
    __tablename__ = "metadata_tables"

    id = Column(Integer, primary_key=True, index=True)

    table_name = Column(
        String,
        nullable=False
    )


class MetadataColumn(Base):
    __tablename__ = "metadata_columns"

    id = Column(Integer, primary_key=True, index=True)

    table_id = Column(
        Integer,
        ForeignKey("metadata_tables.id")
    )

    column_name = Column(
        String,
        nullable=False
    )

    data_type = Column(
        String,
        nullable=False
    )