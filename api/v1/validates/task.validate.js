module.exports.create = (req, res, next) => {
  if(!req.body.title){
    return res.status(400).json({ message: 'Vui lòng nhập tiêu đề!' });
  }
  if(!req.body.status){
    return res.status(400).json({ message: 'Vui lòng nhập trạng thái công việc!' });
  }
  if(!req.body.content){
    return res.status(400).json({ message: 'Vui lòng nhập nội dung!' });
  }
  next();
}
