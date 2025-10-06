const express = require("express");
const router = express.Router();
const captainController = require("../controllers/captain.js");
const authmiddleware = require("../middleware/authmiddleware.js");

router.post("/register", captainController.registerCaptain);
router.post("/login", captainController.loginCaptain);
router.post("/logout", authmiddleware.captainAuth, captainController.logoutCaptain);
router.get("/getdetails", authmiddleware.captainAuth, captainController.captainProfile);

module.exports = router;
