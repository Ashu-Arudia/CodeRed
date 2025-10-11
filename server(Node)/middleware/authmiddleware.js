const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;
require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    console.log("No token found");
    return res.status(401).json({ error: "No or malformed token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;
    next(); // Pass control to next middleware or route handler
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(403).json({ error: "Invalid or expired token" });
  }
}

module.exports = authenticateToken;
