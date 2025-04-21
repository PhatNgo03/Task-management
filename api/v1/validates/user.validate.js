const validate = {};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

validate.register = (req, res, next) => {
  const { fullName, email, password } = req.body;

  // fullName
  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    return res.status(400).json({ message: 'Vui lòng nhập họ và tên!' });
  }
  if (fullName.trim().length < 3) {
    return res.status(400).json({ message: 'Họ và tên phải có ít nhất 3 ký tự!' });
  }
  if (fullName.trim().length > 50) {
    return res.status(400).json({ message: 'Họ và tên tối đa 50 ký tự!' });
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ message: 'Vui lòng nhập email!' });
  }
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ message: 'Email không hợp lệ!' });
  }

  // password
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ message: 'Vui lòng nhập mật khẩu!' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự!' });
  }
  if (password.length > 30) {
    return res.status(400).json({ message: 'Mật khẩu tối đa 30 ký tự!' });
  }

  // confirmPassword
  // if (!confirmPassword || typeof confirmPassword !== 'string') {
  //   return res.status(400).json({ message: 'Vui lòng xác nhận mật khẩu!' });
  // }
  // if (password !== confirmPassword) {
  //   return res.status(400).json({ message: 'Mật khẩu xác nhận không khớp!' });
  // }
  next();
};

// Login validation
validate.login = (req, res, next) => {
  const { email, password } = req.body;

  // email
  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ message: 'Vui lòng nhập email!' });
  }
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ message: 'Email không hợp lệ!' });
  }

  // password
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ message: 'Vui lòng nhập mật khẩu!' });
  }

  next();
};

module.exports = validate;
