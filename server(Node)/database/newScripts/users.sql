-- =====================================================
-- table name - users
-- purpose - to store the user's information
-- =====================================================
-- Drop table if exists
DROP TABLE IF EXISTS users CASCADE;
-- Required extension for UUID support
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- ENUM type for user status
-- =====================================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
        CREATE TYPE user_status AS ENUM ('online', 'offline', 'in_match');
    END IF;
END$$;

-- =====================================================
-- Create users table
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    -- Primary Key
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Authentication & Identity
    username VARCHAR(50) UNIQUE DEFAULT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash TEXT DEFAULT NULL,
    google_id TEXT UNIQUE DEFAULT NULL,
    github_id TEXT UNIQUE DEFAULT NULL,
    
    -- Profile Information
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    profile_image_url TEXT DEFAULT NULL,
    country VARCHAR(100) DEFAULT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',
    
    -- Rating & Ranking System
    current_rating INTEGER DEFAULT 1000,                   -- Starting ELO rating
    peak_rating INTEGER DEFAULT 1000,                      -- Highest rating ever achieved
    current_rank_id INTEGER NOT NULL DEFAULT 6,            -- FK to user_ranks (starts at Sixth)
    
    -- Match Performance Statistics
    total_matches INTEGER DEFAULT 0,
    matches_won INTEGER DEFAULT 0,
    win_rate DECIMAL(5,2) DEFAULT 0.00,                   -- Percentage (0.00 to 100.00)
    problems_solved INTEGER DEFAULT 0,
    
    -- User Preferences
    preferred_language_id INTEGER DEFAULT NULL,            -- FK to languages
    
    -- Account Status & Security
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    status user_status NOT NULL DEFAULT 'offline',
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMPTZ DEFAULT NULL,
    
    -- Foreign Key Constraints
--    CONSTRAINT fk_users_current_rank 
--        FOREIGN KEY (current_rank_id) 
--        REFERENCES user_ranks(rank_id)
--        ON DELETE SET DEFAULT
--        ON UPDATE CASCADE,
--        
--    CONSTRAINT fk_users_preferred_language 
--        FOREIGN KEY (preferred_language_id) 
--        REFERENCES languages(language_id)
--        ON DELETE SET NULL
--        ON UPDATE CASCADE,
    
    -- Check Constraints
    CONSTRAINT chk_users_rating_positive 
        CHECK (current_rating >= 0 AND current_rating <= 5000),
    CONSTRAINT chk_users_peak_rating_valid 
        CHECK (peak_rating >= current_rating),
    CONSTRAINT chk_users_win_rate_valid 
        CHECK (win_rate >= 0 AND win_rate <= 100),
    CONSTRAINT chk_users_matches_valid 
        CHECK (total_matches >= 0 AND matches_won >= 0 AND matches_won <= total_matches),
    CONSTRAINT chk_users_problems_solved_positive 
        CHECK (problems_solved >= 0),
    CONSTRAINT chk_users_email_format 
        CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT chk_users_username_format 
        CHECK (username ~ '^[a-zA-Z0-9_]{3,50}$'),
    CONSTRAINT chk_users_timezone_format 
        CHECK (LENGTH(TRIM(timezone)) > 0)
);
