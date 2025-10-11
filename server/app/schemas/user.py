from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import datetime, date
import re

class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, pattern=r'^[a-zA-Z0-9_]+$')
    email: EmailStr
    first_name: str = Field(..., max_length=50)
    last_name: str = Field(..., max_length=50)
    date_of_birth: date
    bio: Optional[str] = Field(None, max_length=500)
    preferred_language: str = Field(..., max_length=20)

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=128)

class UserResponse(UserBase):
    user_id: int
    is_active: bool
    is_verified: bool
    current_rating: int
    current_rank: str
    total_matches: int
    matches_won: int
    win_rate: float
    problems_solved: int
    profile_complete: bool
    created_at: datetime

    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            date: lambda v: v.isoformat()
        }

class UserProfileUpdate(BaseModel):
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    first_name: Optional[str] = Field(None, max_length=50)
    last_name: Optional[str] = Field(None, max_length=50)
    date_of_birth: Optional[date] = None
    bio: Optional[str] = Field(None, max_length=500)
    preferred_language: Optional[str] = Field(None, max_length=20)