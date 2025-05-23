const Task = require("../models/task.model");
const paginationHelper = require("../../../helpers/pagination");
const searchHelper = require("../../../helpers/search.js");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  try {
    const find = {
      deleted: false,
      $or: [
        { createdBy: req.user.id}, 
        { listUser: req.user.id}
      ]
    }
    if(req.query.status){
      find.status = req.query.status;
    }
    //Search 
    let objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
      find.title = objectSearch.regex;
      }
    //End Search

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

//[PATCH] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
  try{
    const id = req.params.id;
    const status = req.body.status;

    await Task.updateOne({
      _id: id, 
    }, {
      status: status
    });
    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!"
    });
  }
  catch (error){
    res.json({
      code: 404,
      message: "Không tồn tại!"
    });
  }
  
}

//[PATCH] /api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
  try{
    const {ids, key, value} = req.body; //Pha vo cau truc (destructering)

    switch (key) {
      case "status": 
        await Task.updateMany({
          _id: {$in : ids}
        }, {
          status: value
        });
        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công!"
        });
        break;
      case "delete": 
        await Task.updateMany({
          _id: {$in : ids}
        }, {
          deleted: true,
          deletedAt: new Date()
        });
        res.json({
          code: 200,
          message: "Xóa thành công!"
        });
        break;
      default:
        res.json({
          code: 404,
          message: "Không tồn tại!"
        });
        break;
    }

  }
  catch (error){
    res.json({
      code: 404,
      message: "Không tồn tại!"
    });
  }
}

//[POST] /api/v1/tasks/create
module.exports.create = async (req, res) => {
  try{
    req.body.createdBy = req.user.id; //get id of user created task

     // Kiểm tra nếu có taskParentId được truyền vào
     if (req.body.taskParentId) {
      const parentTask = await Task.findOne({ _id: req.body.taskParentId, deleted: false });

      // Nếu không tồn tại task cha thì trả về lỗi
      if (!parentTask) {
        return res.status(400).json({
          code: 400,
          message: "Id không tồn tại hoặc đã bị xóa!",
        });
      }

      // Không cho phép task cha là chính nó
      if (req.body.taskParentId === req.body._id) {
        return res.status(400).json({
          code: 400,
          message: "Id không tồn tại hoặc đã bị xóa!",
        });
      }
    }
    const task = new Task(req.body);
    const data = await task.save();

    res.json({
      code: 200,
      message: "Tạo thành công!",
      data: data
    })
  }
  catch (error){
    res.json({
      code: 400,
      message: "LỖI"
    });
  }
}


//[PATCH] /api/v1/tasks/edit/:id
module.exports.edit = async (req, res) => {
  try{
    const id = req.params.id;
    
    await Task.updateOne({ _id: id}, req.body);

    res.json({
      code: 200,
      message: "Cập nhật thành công!",
    })
  }
  catch (error){
    res.json({
      code: 400,
      message: "LỖI"
    });
  }
}

//[DELETE] /api/v1/tasks/delete/:id
module.exports.delete = async (req, res) => {
  try{
    const id = req.params.id;
    
    await Task.updateOne({ _id: id},
      {
        deleted: true,
        deletedAt: new Date()
      });

    res.json({
      code: 200,
      message: "Xóa thành công!",
    })
  }
  catch (error){
    res.json({
      code: 400,
      message: "LỖI"
    });
  }
}