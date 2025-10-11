from fastapi import APIRouter

router = APIRouter()

@router.post("/google")
async def google_auth():
    """Google OAuth endpoint (to be implemented)"""
    return {"message": "Google OAuth endpoint - to be implemented"}