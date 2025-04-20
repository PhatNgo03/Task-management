const express = require("express");
const router = express.Router();

const validates = require("../validates/task.validate");
const controller = require("../controller/task.controller");

// Lấy danh sách
router.get("/", controller.index);

// Lấy chi tiết
router.get("/detail/:id", controller.detail);

// Thay đổi trạng thái công việc
router.patch("/change-status/:id", controller.changeStatus);

// Thay đổi trạng thái nhiều công việc
router.patch("/change-multi", controller.changeMulti);

// Tạo mới task
router.post("/create",validates.create, controller.create);

// Chỉnh sửa task
router.patch("/edit/:id",validates.edit, controller.edit);

// xóa task
router.delete("/delete/:id", controller.delete);
module.exports = router;
