def build_prompt(
    schema: dict,
    user_request: str
):

    prompt = """
You are a PostgreSQL SQL generator.
Return only SQL.
"""

    ignored_tables = [
        "metadata_tables",
        "metadata_columns"
    ]

    for table_name, columns in schema.items():

        if table_name in ignored_tables:
            continue

        prompt += f"\nTable: {table_name}\n"

        column_names = list(columns.keys())

        prompt += (
            "Columns: "
            + ", ".join(column_names)
            + "\n"
        )

    prompt += f"""

User Request:
{user_request}

Rules:
1. Return only PostgreSQL SQL.
2. Do not explain.
3. Do not use markdown.
4. Do not use backticks.
"""
    return prompt