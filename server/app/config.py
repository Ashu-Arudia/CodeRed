import os
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "postgresql://postgres:password@localhost:5432/codeforge"
    )
    
    # JWT
    SECRET_KEY: str = os.getenv(
        "SECRET_KEY", 
        "your-super-secret-key-change-in-production"
    )
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # # Google OAuth
    # GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "")
    # GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
    
    # Application
    PROJECT_NAME: str = "CodeForge"
    VERSION: str = "1.0.0"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()