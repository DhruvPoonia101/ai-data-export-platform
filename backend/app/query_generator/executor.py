from sqlalchemy import create_engine, text


def execute_sql(
    connection_string: str,
    sql: str,
    page: int = 1,
    page_size: int = 10
):
    sql = sql.strip().rstrip(";")

    engine = create_engine(connection_string)

    offset = (page - 1) * page_size

    paginated_sql = f"""
    {sql}
    LIMIT {page_size}
    OFFSET {offset}
    """

    count_sql = f"""
    SELECT COUNT(*) FROM (
        {sql}
    ) AS total_rows
    """

    with engine.connect() as conn:

        total_rows = conn.execute(
            text(count_sql)
        ).scalar()

        result = conn.execute(
            text(paginated_sql)
        )

        rows = result.fetchall()

        columns = result.keys()

    return {
        "columns": list(columns),
        "rows": [list(row) for row in rows],
        "total_rows": total_rows,
        "page": page,
        "page_size": page_size,
        "total_pages": (
            total_rows + page_size - 1
        ) // page_size
    }