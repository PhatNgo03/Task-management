const validate = {};

validate.create = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({ message: "Vui lòng nhập tiêu đề!" });
  }
  if (!req.body.status) {
    return res.status(400).json({ message: "Vui lòng nhập trạng thái công việc!" });
  }
  if (!req.body.content) {
    return res.status(400).json({ message: "Vui lòng nhập nội dung!" });
  }
  next();
};

validate.edit = (req, res, next) => {
  const { title, status, content } = req.body;

    if (title !== undefined && title.trim().length < 5) {
      return res.status(400).json({ message: "Tiêu đề phải có ít nhất 5 ký tự!" });
    }
  
    if (status !== undefined && status.trim() === "") {
      return res.status(400).json({ message: "Trạng thái không được để trống!" });
    }
  
    if (content !== undefined && content.trim().length < 5) {
      return res.status(400).json({ message: "Nội dung phải có ít nhất 5 ký tự!" });
    }
  
    next();
}
  
module.exports = validate;
