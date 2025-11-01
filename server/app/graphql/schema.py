import strawberry
from typing import List, Optional
from datetime import datetime, date
#from strawberry.types import Info
from app.services.auth_service import AuthService
from app.schemas.user import UserCreate
from app.database import get_db


@strawberry.type
class UserType:
    user_id: int = strawberry.field(name="userId")
    username: str
    email: str
    first_name: Optional[str] = strawberry.field(name="firstName")
    last_name: Optional[str] = strawberry.field(name="lastName")
    current_rating: int = strawberry.field(name="currentRating")
    current_rank: str = strawberry.field(name="currentRank")
    total_matches: int = strawberry.field(name="totalMatches")
    matches_won: int = strawberry.field(name="matchesWon")
    win_rate: float = strawberry.field(name="winRate")
    problems_solved: int = strawberry.field(name="problemsSolved")
    is_active: bool = strawberry.field(name="isActive")
    created_at: datetime = strawberry.field(name="createdAt")


@strawberry.type
class AuthPayload:
    access_token: str = strawberry.field(name="accessToken")
    token_type: str = strawberry.field(name="tokenType")
    user: UserType


@strawberry.type
class CompleteProfileResponse:
    success: bool
    message: str
    user_id: str = strawberry.field(name="userId")
    profile_complete: bool = strawberry.field(name="profileComplete")


@strawberry.input
class UserRegisterInput:
    email: str
    password: str
    username: Optional[str] = None
    first_name: Optional[str] = strawberry.field(name="firstName", default=None)
    last_name: Optional[str] = strawberry.field(name="lastName", default=None)


@strawberry.input
class UserLoginInput:
    email: str
    password: str


@strawberry.input
class CompleteProfileInput:
    username: str
    first_name: str = strawberry.field(name="firstName")
    last_name: str = strawberry.field(name="lastName")
    date_of_birth: Optional[date] = strawberry.field(name="dateOfBirth", default=None)
    bio: Optional[str] = None
    preferred_language: Optional[str] = strawberry.field(name="preferredLanguage", default="en")


@strawberry.type
class Query:
    @strawberry.field
    async def hello(self) -> str:
        return "Hello from CodeForge GraphQL!"

    @strawberry.field
    async def users(self) -> List[UserType]:
        return []


@strawberry.type
class Mutation:
    @strawberry.mutation
    async def register(self, user_data: UserRegisterInput) -> AuthPayload:
        user_create = UserCreate(
            username=user_data.username,
            email=user_data.email,
            password=user_data.password,
            first_name=user_data.first_name,
            last_name=user_data.last_name
        )
        
        async for db in get_db():
            user, error = await AuthService.create_user(db, user_create)
            if error:
                raise Exception(error)
            
            tokens = AuthService.create_user_tokens(user.user_id)
            
            user_type = UserType(
                user_id=user.user_id,
                username=user.username,
                email=user.email,
                first_name=user.first_name,
                last_name=user.last_name,
                current_rating=user.current_rating,
                current_rank=user.current_rank,
                total_matches=user.total_matches,
                matches_won=user.matches_won,
                win_rate=float(user.win_rate or 0.0),
                problems_solved=user.problems_solved,
                is_active=user.is_active,
                created_at=user.created_at
            )
            
            return AuthPayload(
                access_token=tokens["access_token"],
                token_type=tokens["token_type"],
                user=user_type
            )

    @strawberry.mutation
    async def login(self, login_data: UserLoginInput) -> AuthPayload:
        async for db in get_db():
            user = await AuthService.authenticate_user(
                db, login_data.email, login_data.password
            )
            
            if not user:
                raise Exception("Invalid email or password")
            
            tokens = AuthService.create_user_tokens(user.user_id)
            
            user_type = UserType(
                user_id=user.user_id,
                username=user.username,
                email=user.email,
                first_name=user.first_name,
                last_name=user.last_name,
                current_rating=user.current_rating,
                current_rank=user.current_rank,
                total_matches=user.total_matches,
                matches_won=user.matches_won,
                win_rate=float(user.win_rate or 0.0),
                problems_solved=user.problems_solved,
                is_active=user.is_active,
                created_at=user.created_at
            )
            
            return AuthPayload(
                access_token=tokens["access_token"],
                token_type=tokens["token_type"],
                user=user_type
            )

    @strawberry.mutation
    async def complete_profile(
        self, 
        input: CompleteProfileInput,
        info
    ) -> CompleteProfileResponse:
        async for db in get_db():
            try:
                # Get current user from context
                current_user = info.context.get("current_user")
                
                # Temporary: If no auth, use a default user ID for testing
                if not current_user:
                    # For testing only - remove this in production
                    from app.services.user_service import UserService
                    current_user = await UserService.get_user_by_id(db, 1)  # Use first user
                    
                    if not current_user:
                        return CompleteProfileResponse(
                            success=False,
                            message="Authentication required - no user found",
                            user_id="",
                            profile_complete=False
                        )
                
                # Import necessary services and schemas
                from app.services.user_service import UserService
                from app.schemas.user import UserProfileUpdate
                
                # Check if username is available (and not taken by other users)
                username_exists = await UserService.check_username_exists(db, input.username)
                
                if username_exists and current_user.username != input.username:
                    return CompleteProfileResponse(
                        success=False,
                        message="Username already taken",
                        user_id="",
                        profile_complete=False
                    )
                
                # Convert to UserProfileUpdate schema
                profile_update = UserProfileUpdate(
                    username=input.username,
                    first_name=input.first_name,
                    last_name=input.last_name,
                    date_of_birth=input.date_of_birth,
                    bio=input.bio,
                    preferred_language=input.preferred_language
                )
                
                # Complete profile using the authenticated user's ID
                updated_user = await UserService.complete_user_profile(
                    db, current_user.user_id, profile_update
                )
                
                if not updated_user:
                    return CompleteProfileResponse(
                        success=False,
                        message="Failed to complete profile",
                        user_id="",
                        profile_complete=False
                    )
                
                return CompleteProfileResponse(
                    success=True,
                    message="Profile completed successfully!",
                    user_id=str(updated_user.user_id),
                    profile_complete=True
                )
                
            except Exception as e:
                return CompleteProfileResponse(
                    success=False,
                    message=f"Error: {str(e)}",
                    user_id="",
                    profile_complete=False
                )


schema = strawberry.Schema(query=Query, mutation=Mutation)