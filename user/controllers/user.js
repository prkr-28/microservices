const userModel = require("../models/usermodel.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    return res.status(201).send({ newUser, token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    return res.status(200).send({ user, token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports.myprofile = async (req, res) => {
  try {
    res.send({ user: req.user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
