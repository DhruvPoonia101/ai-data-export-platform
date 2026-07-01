from app.models.source import DataSource


def build_connection_string(source: DataSource):

    return (
        f"postgresql://{source.username}:"
        f"{source.password}@"
        f"{source.host}:"
        f"{source.port}/"
        f"{source.database_name}"
    )