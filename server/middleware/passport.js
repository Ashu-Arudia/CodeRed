const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("../database/db");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE google_id = $1",
          [profile.id]
        );
        if (rows.length > 0) {
          return done(null, rows[0]); // user exists
        }

        const insertResult = await pool.query(
          `INSERT INTO users (google_id, email, is_verified, first_name, last_name, profile_image_url)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING *`,
          [
            profile.id,
            profile.emails[0].value,
            false,
            profile.name.givenName,
            profile.name.familyName,
            profile.photos[0].value,
          ]
        );

        return done(null, insertResult.rows[0]);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
