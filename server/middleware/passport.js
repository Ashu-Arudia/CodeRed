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
          `INSERT INTO users (google_id, email, first_name, last_name, profile_image_url, is_verified)
           VALUES ($1, $2, $3, $4, $5, false)
           RETURNING *`,
          [
            profile.id, // google_id
            profile.emails[0].value, // email
            profile.name.givenName || null, // first_name
            profile.name.familyName || null, // last_name
            profile.photos?.[0]?.value || null, // profile_picture
          ]
        );

        return done(null, insertResult.rows[0]);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
