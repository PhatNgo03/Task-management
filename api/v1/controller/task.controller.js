const Task = require("../models/task.model");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  try {
    const find = {
      deleted: false
    }
    if(req.query.status){
      find.status = req.query.status;
    }
    const tasks = await Task.find(find);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi lấy danh sách tasks" });
  }
};

// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOne({ _id: id, deleted: false });

    if (!task) {
      return res.status(404).json({ message: "Không tìm thấy task!" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi lấy chi tiết task" });
  }
};
