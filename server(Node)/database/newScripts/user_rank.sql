-- =====================================================
-- table name - user_rank
-- purpose - to store the ranks information
-- =====================================================
-- Drop table if exists
DROP TABLE IF EXISTS user_rank CASCADE;

-- =====================================================
-- Create user_rank table
-- =====================================================
CREATE TABLE IF NOT EXISTS user_rank (
    -- Primary Key
    rank_id 		INT PRIMARY KEY,   						-- rank unique ID (auto-increment)
  	rank_name   	VARCHAR(20) NOT NULL UNIQUE, 			-- rank name 
  	rank_order 		INT NOT NULL UNIQUE,					-- rank order
  	min_rating 		DECIMAL NOT NULL UNIQUE,				-- minimum rating required to get the rank
  	max_rating 		DECIMAL NOT NULL UNIQUE,				-- maximum rating required to surpass the rank
  	rank_color 		VARCHAR(20) UNIQUE DEFAULT '#888888',	-- color to indicate the rank
  	rank_icon 		VARCHAR(20) UNIQUE DEFAULT NULL,		-- icon to indicate the rank
  	promotion_bonus INT DEFAULT NULL,						-- bonus score
  	created_at 		TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,	-- rank created time
  	updated_at 		TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,	-- rank updation time
  	
  	
  	-- Constraints
    CONSTRAINT chk_rank_order_valid 
        CHECK (rank_order >= 1 AND rank_order <= 6),
    CONSTRAINT chk_rating_range_valid 
        CHECK (min_rating >= 0 AND max_rating > min_rating),
    CONSTRAINT chk_rank_color_format 
        CHECK (rank_color ~* '^#[0-9A-Fa-f]{6}$')
);
