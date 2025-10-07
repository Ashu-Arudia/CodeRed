const express = require("express");
const cors = require("cors");
const app = express();
const passport = require("passport");
const authRoutes = require("./routes/auth/authenticate");
// const userRoutes = require("./routes/user/users");
require("dotenv").config();
require("./middleware/passport");

app.use(cors());

//middleware
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server Started!! at Port: ", process.env.PORT);
});
