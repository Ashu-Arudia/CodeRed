from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.core.auth import get_current_user
from app.services.auth_service import AuthService
from app.schemas.user import UserCreate, UserLogin, UserResponse, Token
from app.models.user import User


router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    """Register a new user"""
    user, error = await AuthService.create_user(db, user_data)
    
    if error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error
        )
    
    return user


@router.post("/login", response_model=Token)
async def login(
    login_data: UserLogin,
    db: AsyncSession = Depends(get_db)
):
    """Login user and return JWT tokens"""
    user = await AuthService.authenticate_user(db, login_data.email, login_data.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    tokens = AuthService.create_user_tokens(user.user_id)
    return tokens


@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(
    current_user: User = Depends(get_current_user)
):
    """Get current user profile"""
    return current_user