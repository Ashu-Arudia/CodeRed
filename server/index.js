const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());

app.listen(process.env.PORT, () => {
  console.log("Server Started!!");
});
