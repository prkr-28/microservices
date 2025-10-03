const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/route.js");

app.use("/", userRoutes);

module.exports = app;
