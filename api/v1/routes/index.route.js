const express = require("express");
const router = express.Router();
const taskController = require("../controller/task.controller");

// Lấy danh sách
router.get("/api/v1/tasks", taskController.index);

// Lấy chi tiết
router.get("/api/v1/tasks/detail/:id", taskController.detail);


module.exports = router;
