const captainModel = require("../models/captainmodel.js");
const blacklistedTokenModel = require("../models/blacklistedtokens.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerCaptain = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
      return res.status(400).send({ message: "captain already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCaptain = new captainModel({
      name,
      email,
      password: hashedPassword,
    });
    await newCaptain.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    return res.status(201).send({ newCaptain, token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports.loginCaptain = async (req, res) => {
  try {
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email });
    if (!captain) {
      return res.status(400).send({ message: "captain does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, captain.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: captain._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    return res.status(200).send({ captain, token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports.logoutCaptain = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).send({ message: "No token found" });
    }
    await blacklistedTokenModel.create({ token });
    res.clearCookie("token");
    return res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports.captainProfile = async (req, res) => {
  try {
    res.send({ captain: req.captain });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
