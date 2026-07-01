def build_prompt(
    schema: dict,
    user_request: str
):
    request = user_request.lower()

    aliases = {
        "user": "users",
        "users": "users",

        "data source": "data_sources",
        "data sources": "data_sources",

        "metadata table": "metadata_tables",
        "metadata tables": "metadata_tables",

        "metadata column": "metadata_columns",
        "metadata columns": "metadata_columns",
    }

    matched_tables = []

    for phrase, table in aliases.items():
        if phrase in request:
            matched_tables.append(table)

    prompt = """
You are an expert PostgreSQL SQL generator.

Return ONLY one PostgreSQL SQL statement.

Rules:
1. Use ONLY the application tables provided below.
2. Never guess table names.
3. Never use information_schema.
4. Never use pg_catalog.
5. Never explain anything.
6. Never use markdown.
7. Never use backticks.
8. If the user refers to an application table, always query that table.
"""

    if matched_tables:
        prompt += "\nRelevant Application Tables:\n"

        for table in matched_tables:

            if table not in schema:
                continue

            prompt += f"\nTable: {table}\n"

            columns = list(schema[table].keys())

            prompt += (
                "Columns: "
                + ", ".join(columns)
                + "\n"
            )

    else:

        prompt += "\nAvailable Application Tables:\n"

        for table_name, columns in schema.items():

            prompt += f"\nTable: {table_name}\n"

            prompt += (
                "Columns: "
                + ", ".join(columns.keys())
                + "\n"
            )

    prompt += f"""

User Request:
{user_request}

Return only SQL.
"""

    return prompt