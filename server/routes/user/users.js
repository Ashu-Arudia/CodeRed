// // routes/userDetails.js
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const upload = multer({ dest: "uploads/" });

// router.post("/create-profile", upload.single("image"), (req, res) => {
//   console.log(req.body);
//   res.json({ ok: true, message: "received" });
// });
