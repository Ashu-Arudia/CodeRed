from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import strawberry
from strawberry.fastapi import GraphQLRouter

from app.config import settings
from app.database import engine,Base
from app.graphql.schema import schema

def create_application() -> FastAPI:
    """Application factory pattern for better testability"""
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        docs_url="/docs",
        redoc_url="/redoc"
    )

    # Add middleware
    setup_middleware(app)

    # Add routes
    setup_routes(app)

    # Add event handlers
    setup_events(app)

    return app

def setup_middleware(app: FastAPI) -> None:
    """setup all middleware"""
    
    # Replace with your NEW ngrok URL
    origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000", 
        "https://9198840bf6b6.ngrok-free.app",  # ← Update this!
        "https://*.ngrok-free.app"
    ]
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

def setup_routes(app: FastAPI) -> None:
    """Setup all API routes"""
    
    from fastapi import Request, Depends, HTTPException
    from sqlalchemy.ext.asyncio import AsyncSession
    from app.database import get_db
    from app.core.security import verify_token  # Import verify_token directly
    from app.services.auth_service import AuthService

    async def get_context(
        request: Request,
        db: AsyncSession = Depends(get_db)
    ):
        # Extract token from headers
        auth_header = request.headers.get("authorization", "")
        token = auth_header.replace("Bearer ", "") if auth_header.startswith("Bearer ") else ""
        
        current_user = None
        if token:
            try:
                # Use verify_token directly (bypassing the dependency system)
                payload = verify_token(token)
                
                if payload is not None:
                    user_id = int(payload.get("sub"))
                    current_user = await AuthService.get_user_by_id(db, user_id)
                    
            except Exception as e:
                print(f"Auth error: {e}")
                # Don't raise exception - just leave current_user as None
                pass
        
        return {
            "db": db,
            "current_user": current_user,
            "request": request
        }
    
    # GraphQL with context
    graphql_app = GraphQLRouter(schema, context_getter=get_context)
    app.include_router(graphql_app, prefix="/graphql")
    
    # REST API
    from app.api.v1.endpoints import auth
    app.include_router(auth.router, prefix="/api/v1")

def setup_events(app: FastAPI) -> None:
    """Setup startup/shutdown events"""
    
    @app.on_event("startup")
    async def startup_event():
        from app.models.user import User  # Import inside function to avoid circular imports
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("✅ Database tables created successfully")
    
    @app.get("/")
    async def root():
        return {
            "message": "CodeForge API is running!",
            "version": settings.VERSION,
            "docs": "/docs",
            "graphql": "/graphql"
        }
    
    @app.get("/health")
    async def health_check():
        return {"status": "healthy", "service": "CodeForge API"}
    
# Create app instance
app = create_application()