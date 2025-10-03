const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/route.js");

const cookieParser = require("cookie-parser");
const connectDB = require("./db/db.js");
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);

module.exports = app;
