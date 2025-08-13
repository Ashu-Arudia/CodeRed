-- =====================================================
-- 001_create_user_ranks.sql
-- User Ranking System for CodeForge
-- Dependencies: None (Foundation table)
-- =====================================================

-- Create user_ranks table
CREATE TABLE user_ranks (
    -- Primary Key
    rank_id SERIAL PRIMARY KEY,
    
    -- Rank Information
    rank_name VARCHAR(20) NOT NULL UNIQUE,
    rank_order INTEGER NOT NULL UNIQUE,                    -- 1=First (highest), 6=Sixth (lowest)
    
    -- Rating Ranges
    min_rating INTEGER NOT NULL,
    max_rating INTEGER NOT NULL,
    
    -- Visual Properties
    rank_color VARCHAR(7) NOT NULL DEFAULT '#888888',      -- Hex color code
    rank_icon VARCHAR(50) DEFAULT NULL,                    -- Icon name/path
    
    -- Game Mechanics
    promotion_bonus INTEGER DEFAULT 0,                     -- Points for reaching this rank
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT chk_rank_order_valid 
        CHECK (rank_order >= 1 AND rank_order <= 6),
    CONSTRAINT chk_rating_range_valid 
        CHECK (min_rating >= 0 AND max_rating > min_rating),
    CONSTRAINT chk_rank_color_format 
        CHECK (rank_color ~* '^#[0-9A-Fa-f]{6}$')
);

-- Create indexes for performance
CREATE INDEX idx_user_ranks_order ON user_ranks(rank_order);
CREATE INDEX idx_user_ranks_rating_range ON user_ranks(min_rating, max_rating);

-- Insert the 6 default ranks (from lowest to highest skill)
INSERT INTO user_ranks (rank_name, rank_order, min_rating, max_rating, rank_color, promotion_bonus) VALUES
    ('Sixth',  6, 0,    400,  '#8B4513', 0),      -- Brown - Beginner
    ('Fifth',  5, 400,  800,  '#C0C0C0', 50),     -- Silver - Basic  
    ('Fourth', 4, 800,  1200, '#FFD700', 100),    -- Gold - Intermediate
    ('Third',  3, 1200, 1600, '#40E0D0', 200),    -- Turquoise - Advanced
    ('Second', 2, 1600, 2000, '#9370DB', 300),    -- Purple - Expert
    ('First',  1, 2000, 9999, '#FF4500', 500);    -- Orange-Red - Master

-- Add documentation comments
COMMENT ON TABLE user_ranks IS 'Defines the 6 skill-based ranking system for CodeForge users';
COMMENT ON COLUMN user_ranks.rank_order IS 'Rank hierarchy: 1=First (highest skill), 6=Sixth (lowest skill)';
COMMENT ON COLUMN user_ranks.min_rating IS 'Minimum rating points required for this rank';
COMMENT ON COLUMN user_ranks.max_rating IS 'Maximum rating points for this rank (exclusive upper bound)';
COMMENT ON COLUMN user_ranks.promotion_bonus IS 'Bonus points awarded when user reaches this rank';

-- Verify the data
SELECT rank_name, rank_order, min_rating, max_rating, rank_color 
FROM user_ranks 
ORDER BY rank_order;