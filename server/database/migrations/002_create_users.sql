-- =====================================================
-- 002_create_users.sql
-- Core User Management Table for CodeForge
-- Dependencies: user_ranks, languages (will create languages first)
-- =====================================================

-- Create users table with all required fields
CREATE TABLE users (
    -- Primary identification
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,

    -- Authentication & Security
    password_hash VARCHAR(255) NOT NULL,

    -- Profile Information
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    profile_picture VARCHAR(255) DEFAULT NULL,
    country VARCHAR(100) DEFAULT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',

    -- Rating & Performance Metrics
    current_rating INTEGER DEFAULT 1000,                    -- Starting rating
    peak_rating INTEGER DEFAULT 1000,                       -- Highest rating achieved
    current_rank_id INTEGER NOT NULL DEFAULT 6,             -- References user_ranks (Sixth rank)

    -- Match Statistics
    total_matches INTEGER DEFAULT 0,
    matches_won INTEGER DEFAULT 0,
    win_rate DECIMAL(5,2) DEFAULT 0.00,                    -- Percentage (0.00 to 100.00)
    problems_solved INTEGER DEFAULT 0,

    -- Preferences
    preferred_language_id INTEGER DEFAULT NULL,             -- References languages table

    -- Account Status
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT NULL,

    -- Foreign Key Constraints
    CONSTRAINT fk_users_rank
        FOREIGN KEY (current_rank_id)
        REFERENCES user_ranks(rank_id)
        ON DELETE SET DEFAULT,                              -- If rank deleted, set to default

    -- Note: preferred_language_id FK will be added after languages table exists

    -- Check Constraints
    CONSTRAINT chk_rating_positive
        CHECK (current_rating >= 0),
    CONSTRAINT chk_peak_rating_valid
        CHECK (peak_rating >= current_rating),
    CONSTRAINT chk_win_rate_valid
        CHECK (win_rate >= 0 AND win_rate <= 100),
    CONSTRAINT chk_matches_valid
        CHECK (total_matches >= 0 AND matches_won >= 0 AND matches_won <= total_matches),
    CONSTRAINT chk_email_format
        CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_rating ON users(current_rating DESC);
CREATE INDEX idx_users_rank ON users(current_rank_id);
CREATE INDEX idx_users_active ON users(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_users_updated_at();

-- Add helpful comments for documentation
COMMENT ON TABLE users IS 'Core user accounts and profile information for CodeForge platform';
COMMENT ON COLUMN users.current_rating IS 'Current ELO-style rating (starts at 1000)';
COMMENT ON COLUMN users.peak_rating IS 'Highest rating ever achieved by user';
COMMENT ON COLUMN users.win_rate IS 'Percentage of matches won (0.00 to 100.00)';
COMMENT ON COLUMN users.current_rank_id IS 'Current rank based on rating (FK to user_ranks)';
COMMENT ON COLUMN users.preferred_language_id IS 'User preferred coding language (FK to languages)';
COMMENT ON COLUMN users.is_verified IS 'Email verification status';
COMMENT ON COLUMN users.timezone IS 'User timezone for scheduling matches';

-- Sample data for testing (optional - remove in production)
-- INSERT INTO users (username, email, password_hash, first_name, last_name, current_rating, current_rank_id)
-- VALUES
--     ('johndoe', 'john@example.com', '$2b$10$hash123', 'John', 'Doe', 1200, 4),
--     ('alice_coder', 'alice@example.com', '$2b$10$hash456', 'Alice', 'Smith', 1800, 2);