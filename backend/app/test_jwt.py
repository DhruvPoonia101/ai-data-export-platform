from app.core.jwt_handler import (
    create_access_token
)

token = create_access_token(
    {"sub": "dhruv@gmail.com"}
)

print(token)