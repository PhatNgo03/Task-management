const express = require("express");
const router = express.Router();

const validates = require("../validates/user.validate");
const controller = require("../controller/user.controller")

router.post("/register", validates.register, controller.register);

router.post("/login", validates.login, controller.login);

router.post("/password/forgot", controller.forgotPassword);
module.exports = router; 