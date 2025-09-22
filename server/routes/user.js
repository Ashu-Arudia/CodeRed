// routes/userDetails.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = function makeUserDetailsRoute(
  pool,
  baseUrl = process.env.BASE_URL || "http://localhost:8000"
) {
  const UPLOAD_DIR = path.join(process.cwd(), "uploads", "profile");
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, UPLOAD_DIR),
    filename: (_, file, cb) => {
      const ext = path.extname(file.originalname || "");
      cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
    },
  });
  const fileFilter = (_, file, cb) => {
    const ok = ["image/jpeg", "image/png", "image/webp"].includes(
      file.mimetype
    );
    cb(ok ? null : new Error("Only JPG/PNG/WEBP allowed"), ok);
  };
  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });

  // POST /api/user/user-details  (multipart/form-data)
  router.post(
    "/user-details",
    upload.single("profileImage"),
    async (req, res) => {
      const authHeader = req.headers.authorization || "";
      const bearer = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;
      const token = bearer || req.query.token;
      if (!token) {
        if (req.file)
          try {
            fs.unlinkSync(path.join(UPLOAD_DIR, req.file.filename));
          } catch (_) {}
        return res.status(401).json({ ok: false, error: "Missing auth token" });
      }

      let userId;
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (_e) {
        if (req.file)
          try {
            fs.unlinkSync(path.join(UPLOAD_DIR, req.file.filename));
          } catch (_) {}
        return res
          .status(401)
          .json({ ok: false, error: "Invalid or expired token" });
      }

      try {
        const {
          username = "",
          password = "",
          bio = "",
          preferredLanguage = "",
          dateOfBirth = "",
        } = req.body;

        // ---- validations ----
        const bad = (m) => res.status(400).json({ ok: false, error: m });
        if (!username.trim()) return bad("Username is required");
        if (username.length < 3 || username.length > 12)
          return bad("Username must be 3–12 characters");
        if (password && password.length < 6)
          return bad("Password must be at least 6 characters");
        if (!["python", "cpp", "java"].includes(preferredLanguage))
          return bad("Invalid preferred language");
        if (!dateOfBirth) return bad("Date of birth is required");
        if (bio && bio.length > 200) return bad("Bio must be ≤ 200 characters");

        // age ≥ 13
        const dob = new Date(dateOfBirth);
        if (Number.isNaN(dob.getTime()))
          return bad("Invalid dateOfBirth format (use YYYY-MM-DD)");
        const today = new Date();
        const age =
          today.getFullYear() -
          dob.getFullYear() -
          (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate())
            ? 1
            : 0);
        if (age < 13) return bad("You must be at least 13 years old");

        // ensure username unique for other users
        const dupe = await pool.query(
          "SELECT 1 FROM users WHERE username = $1 AND user_id <> $2 LIMIT 1",
          [username.trim(), userId]
        );
        if (dupe.rowCount > 0)
          return res
            .status(409)
            .json({ ok: false, error: "Username already taken" });

        // optional image URL
        let profileImageUrl = null;
        if (req.file) {
          profileImageUrl = `${baseUrl}/uploads/profile/${req.file.filename}`;
        }

        // optional password hash
        let passwordHash = null;
        if (password) {
          passwordHash = await bcrypt.hash(password, 10);
        }

        // build dynamic update
        const fields = [
          { col: "username", val: username.trim() },
          { col: "bio", val: bio || null },
          { col: "preferred_language", val: preferredLanguage },
          { col: "date_of_birth", val: dateOfBirth },
          { col: "is_verified", val: true },
        ];
        if (profileImageUrl)
          fields.push({ col: "profile_image_url", val: profileImageUrl });
        if (passwordHash)
          fields.push({ col: "password_hash", val: passwordHash });

        const setClauses = fields
          .map((f, i) => `${f.col} = $${i + 1}`)
          .join(", ");
        const values = fields.map((f) => f.val);
        values.push(userId);

        const sql = `
        UPDATE users
        SET ${setClauses}
        WHERE user_id = $${values.length}
        RETURNING user_id AS "userId",
                  username,
                  email,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  bio,
                  preferred_language AS "preferredLanguage",
                  date_of_birth AS "dateOfBirth",
                  profile_image_url AS "profileImageUrl",
                  is_verified AS "isVerified";
      `;
        const { rows } = await pool.query(sql, values);

        if (rows.length === 0) {
          // if user doesn't exist (shouldn't happen if token came from your login)
          return res.status(404).json({ ok: false, error: "User not found" });
        }

        return res.status(200).json({ ok: true, user: rows[0] });
      } catch (e) {
        // cleanup uploaded file on error
        if (req.file) {
          try {
            fs.unlinkSync(path.join(UPLOAD_DIR, req.file.filename));
          } catch (_) {}
        }
        // unique violation fallback
        if (e.code === "23505") {
          return res.status(409).json({
            ok: false,
            error: "Duplicate value violates unique constraint",
          });
        }
        return res
          .status(500)
          .json({ ok: false, error: "Internal server error" });
      }
    }
  );

  return router;
};
