const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");
const authmiddleware = require("../middleware/authmiddleware.js");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", authmiddleware.userAuth, userController.logoutUser);
router.get("/getdetails", authmiddleware.userAuth, userController.myprofile);

module.exports = router;
