const express = require("express");
const router = express.Router();

const validates = require("../validates/user.validate");
const authMiddleware = require("../middlewares/auth.middleware");
const controller = require("../controller/user.controller")

router.post("/register", validates.register, controller.register);

router.post("/login", validates.login, controller.login);

router.post("/password/forgot", controller.forgotPassword);

router.post("/password/otp", controller.otpPassword);

router.post("/password/reset", controller.resetPassword);

router.get("/detail", authMiddleware.requireAuth, controller.detail);

router.get("/list", authMiddleware.requireAuth, controller.list);
module.exports = router; 