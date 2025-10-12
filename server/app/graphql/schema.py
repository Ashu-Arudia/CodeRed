import strawberry
from typing import List, Optional
from datetime import datetime

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


@strawberry.input
class UserRegisterInput:
    username: str
    email: str
    password: str
    first_name: Optional[str] = strawberry.field(name="firstName", default=None)
    last_name: Optional[str] = strawberry.field(name="lastName", default=None)


@strawberry.input
class UserLoginInput:
    email: str
    password: str


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


schema = strawberry.Schema(query=Query, mutation=Mutation)