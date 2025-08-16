const express = require("express");
const passport = require("passport");
const router = express.Router();
const pool = require("../db"); // pg pool
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ---------- Google OAuth start ----------
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// ---------- Google OAuth callback ----------
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const profile = req.user; // Filled by passport
      const googleId = profile.google_id; // Or profile.id if coming from Google
      const email = profile.email;
      const firstName = profile.first_name;
      const lastName = profile.last_name;

      // 1️⃣ Check if user exists
      const existingUserResult = await pool.query(
        "SELECT * FROM users WHERE google_id = $1",
        [googleId]
      );

      let user;

      if (existingUserResult.rows.length > 0) {
        user = existingUserResult.rows[0];
      } else {
        // 2️⃣ Insert new user
        const insertUserResult = await pool.query(
          `INSERT INTO users
           (google_id, email, first_name, last_name, is_verified)
           VALUES ($1, $2, $3, $4, TRUE)
           RETURNING *`,
          [googleId, email, firstName, lastName]
        );

        user = insertUserResult.rows[0];
      }

      // 3️⃣ Create JWT token
      const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // 4️⃣ Redirect based on profile completion & role
      let redirectUrl;

      if (!user.is_profile_complete) {
        redirectUrl = `${process.env.URL}/signup?token=${token}`;
      } else {
        redirectUrl =
          user.role === "teacher"
            ? `${process.env.URL}/teacher0?token=${token}&role=${user.role}`
            : `${process.env.URL}/student?token=${token}&role=${user.role}`;
      }

      res.redirect(redirectUrl);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
