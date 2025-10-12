from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
import secrets

from app.database import get_db
from app.services.auth_service import AuthService
from app.models.user import User

router = APIRouter()

class MockGoogleUser(BaseModel):
    email: str
    first_name: str = "Test"
    last_name: str = "User"
    google_id: str = "mock_google_123"

@router.post("/mock-register")
async def mock_google_register(
    user_data: MockGoogleUser,
    db: AsyncSession = Depends(get_db)
):
    """
    Mock Google registration for testing
    Creates a user as if they registered via Google
    """
    try:
        from sqlalchemy import select
        
        # Check if user already exists
        existing_user = await db.execute(
            select(User).where(User.email == user_data.email)
        )
        existing_user = existing_user.scalar_one_or_none()
        
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User already exists"
            )
        
        # Create mock Google user
        new_user = User(
            email=user_data.email,
            username=user_data.email.split('@')[0],
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            google_id=user_data.google_id,
            auth_provider="google",
            is_verified=True,
            is_active=True,
            profile_complete=True
        )
        
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        
        # Generate tokens
        tokens = AuthService.create_user_tokens(new_user.user_id)
        
        return {
            "success": True,
            "message": "Mock Google registration successful",
            "user_id": new_user.user_id,
            "email": new_user.email,
            "access_token": tokens["access_token"],
            "token_type": tokens["token_type"],
            "profile_complete": new_user.profile_complete
        }
        
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Mock registration failed: {str(e)}"
        )

@router.post("/mock-authenticate")
async def mock_google_authenticate(
    user_data: MockGoogleUser,
    db: AsyncSession = Depends(get_db)
):
    """
    Mock Google authentication for testing
    Simulates Google OAuth flow
    """
    try:
        from sqlalchemy import select
        
        # Find user by Google ID or email
        existing_user = await db.execute(
            select(User).where(
                (User.google_id == user_data.google_id) | 
                (User.email == user_data.email)
            )
        )
        existing_user = existing_user.scalar_one_or_none()
        
        if not existing_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found. Please register first."
            )
        
        # Update last login
        from sqlalchemy.sql import func
        existing_user.last_login = func.now()
        await db.commit()
        await db.refresh(existing_user)
        
        # Generate tokens
        tokens = AuthService.create_user_tokens(existing_user.user_id)
        
        return {
            "success": True,
            "message": "Mock Google authentication successful",
            "user_id": existing_user.user_id,
            "email": existing_user.email,
            "access_token": tokens["access_token"],
            "token_type": tokens["token_type"],
            "profile_complete": existing_user.profile_complete
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Mock authentication failed: {str(e)}"
        )

@router.get("/test-setup")
async def test_google_setup():
    """
    Test if Google OAuth is properly configured
    """
    from app.config import settings
    
    config_status = {
        "google_client_id_configured": bool(settings.GOOGLE_CLIENT_ID and settings.GOOGLE_CLIENT_ID != ""),
        "google_client_secret_configured": bool(settings.GOOGLE_CLIENT_SECRET and settings.GOOGLE_CLIENT_SECRET != ""),
        "google_redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "missing_configuration": []
    }
    
    if not config_status["google_client_id_configured"]:
        config_status["missing_configuration"].append("GOOGLE_CLIENT_ID")
    if not config_status["google_client_secret_configured"]:
        config_status["missing_configuration"].append("GOOGLE_CLIENT_SECRET")
    
    return config_status