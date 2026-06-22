from pydantic import BaseModel


class DataSourceCreate(BaseModel):
    name: str
    source_type: str
    host: str
    port: int
    database_name: str
    username: str
    password: str