const md5 = require("md5");
const User = require("../models/user.model");

//  [POST] /api/v1/users/register
module.exports.register = async(req, res) => {
  try{
    req.body.password =  md5(req.body.password);

    const existEmail = await User.findOne({
      email : req.body.email,
      deleted: {$ne : true } //account chua bi xoa
    });
  
    if (existEmail) {
      return res.status(400).json({ code: 400, message: "Tài khoản đã tồn tại" });
    }
    else {
      const user = new User({
        fullName : req.body.fullName,
        email: req.body.email,
        password : req.body.password
      });

      await user.save();

      const token = user.tokenUser;
      res.cookie("token", token);
      
      res.json({
        code: 200,
        message: "Tạo tài khoản thành công!",
        token:  token
      });
    }
  }
  catch(error) {
    res.json({
      code: 400,
      message: "Lỗi đăng kí tài khoản"
    });
  }
}
