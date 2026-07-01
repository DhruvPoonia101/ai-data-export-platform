def validate_sql(sql: str):

    blocked_keywords = [
        "DROP",
        "DELETE",
        "TRUNCATE",
        "ALTER",
        "UPDATE",
        "INSERT"
    ]

    sql_upper = sql.upper()

    for keyword in blocked_keywords:

        if keyword in sql_upper:

            return False

    return True