const Task = require("../models/task.model");
const paginationHelper = require("../../../helpers/pagination");
const searchHelper = require("../../../helpers/search.js");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  try {
    const find = {
      deleted: false
    }
    if(req.query.status){
      find.status = req.query.status;
    }

    //Pagination
    let initPagination = {
      currentPage: 1,
      limitItems: 2
    }
    const countTasks = await Task.countDocuments(find);
    let objectPagination = paginationHelper(
      initPagination,
      req.query,
      countTasks 
    )
    //Search 
    let objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
      find.title = objectSearch.regex;
     }
   
    //End Search
    //Pagination
    //sort
    const sort = {};
    if(req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    }
    //end sort
    const tasks = await Task.find(find)
      .sort(sort)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip);

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
