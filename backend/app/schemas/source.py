from pydantic import BaseModel


class DataSourceCreate(BaseModel):
    name: str
    source_type: str
    host: str
    database_name: str
    username: str