from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version();"))
        print("Database Connected Successfully!")
        print(result.fetchone())
except Exception as e:
    print("Database Connection Failed!")
    print(e)