const express = require("express");
const router = express.Router();


const controller = require("../controller/task.controller");

// Lấy danh sách
router.get("/", controller.index);

// Lấy chi tiết
router.get("/detail/:id", controller.detail);

// Thay đổi trạng thái công việc
router.patch("/change-status/:id", controller.changeStatus);

// Thay đổi trạng thái nhiều công việc
router.patch("/change-multi", controller.changeMulti);
module.exports = router;
