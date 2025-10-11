from sqlalchemy import Column, Integer, String, Boolean, DateTime, DECIMAL
from sqlalchemy.sql import func
from app.database import Base


class User(Base):
    """User model for CodeForge platform"""
    
    __tablename__ = "users"

    # Primary Key & Identification
    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=True)  # Nullable for OAuth

    # Profile Information
    first_name = Column(String(50), nullable=True)
    last_name = Column(String(50), nullable=True)
    profile_picture = Column(String(255), nullable=True)
    country = Column(String(100), nullable=True)
    timezone = Column(String(50), default='UTC')

    # Rating & Ranking System
    current_rating = Column(Integer, default=1000, nullable=False)
    peak_rating = Column(Integer, default=1000, nullable=False)
    current_rank = Column(String(20), default='Bronze', nullable=False)

    # Match Performance Statistics
    total_matches = Column(Integer, default=0, nullable=False)
    matches_won = Column(Integer, default=0, nullable=False)
    win_rate = Column(DECIMAL(5, 2), default=0.00, nullable=False)
    problems_solved = Column(Integer, default=0, nullable=False)

    # Authentication & Status
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    auth_provider = Column(String(20), default='local', nullable=False)
    google_id = Column(String(100), unique=True, nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), 
                       onupdate=func.now(), nullable=False)
    last_login = Column(DateTime(timezone=True), nullable=True)

    def __repr__(self) -> str:
        return f"<User(user_id={self.user_id}, username='{self.username}', email='{self.email}')>"

    @property
    def full_name(self) -> str:
        """Get user's full name"""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.username

    def update_rating(self, new_rating: int) -> None:
        """Update user rating and peak rating"""
        self.current_rating = new_rating
        if new_rating > self.peak_rating:
            self.peak_rating = new_rating

    def update_match_stats(self, won: bool) -> None:
        """Update match statistics"""
        self.total_matches += 1
        if won:
            self.matches_won += 1
        self.win_rate = round((self.matches_won / self.total_matches) * 100, 2) if self.total_matches > 0 else 0.00