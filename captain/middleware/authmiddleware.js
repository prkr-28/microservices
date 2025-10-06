const jwt = require("jsonwebtoken");
const captainModel = require("../models/captainmodel.js");
const blacklistedTokenModel = require("../models/blacklistedtokens.js");

module.exports.captainAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ message: "Unauthorized please register your details." });
    }

    const isBlacklisted = await blacklistedTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).send({ message: "You have been logged out. Please log in again." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded.userId);
    if (!captain) {
      return res.status(404).send({ message: "Captain not found" });
    }
    req.captain = captain;
    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
