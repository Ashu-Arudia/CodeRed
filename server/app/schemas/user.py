from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import datetime
import re


class UserBase(BaseModel):
    """Base user schema with common fields"""
    username: str = Field(..., min_length=3, max_length=50, pattern=r'^[a-zA-Z0-9_]+$')
    email: EmailStr
    first_name: Optional[str] = Field(None, max_length=50)
    last_name: Optional[str] = Field(None, max_length=50)

    @validator('username')
    def validate_username(cls, v):
        if not re.match(r'^[a-zA-Z0-9_]+$', v):
            raise ValueError('Username can only contain letters, numbers, and underscores')
        return v


class UserCreate(UserBase):
    """Schema for user creation"""
    password: str = Field(..., min_length=8, max_length=128)

    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one number')
        if not any(c in '!@#$%^&*(),.?":{}|<>' for c in v):
            raise ValueError('Password must contain at least one special character')
        return v


class UserLogin(BaseModel):
    """Schema for user login"""
    email: EmailStr
    password: str = Field(..., min_length=1)


class UserResponse(UserBase):
    """Schema for user response (what we return to clients)"""
    user_id: int
    is_active: bool
    is_verified: bool
    current_rating: int
    current_rank: str
    total_matches: int
    matches_won: int
    win_rate: float
    problems_solved: int
    created_at: datetime

    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class Token(BaseModel):
    """Schema for authentication token"""
    access_token: str
    token_type: str = "bearer"
    user_id: int


class TokenData(BaseModel):
    """Schema for token payload data"""
    user_id: Optional[int] = None