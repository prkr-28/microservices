const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodel.js");

module.exports.userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ message: "Unauthorized please register your details." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
