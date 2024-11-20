function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res
    .status(401)
    .json({ message: "Cần phải đăng nhập để thực hiện chức năng này" });
}
//Kiem tra dang nhap

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
    return next();
  }
  res
    .status(403)
    .json({ message: "Bị chặn: chỉ có quản lý mới có quyền truy cập" });
}
//Kiểm tra có phải admin không

function isEmployee(req, res, next) {
  if (!req.user.isAdmin) {
    return next();
  }
  res
    .status(403)
    .json({ message: "Forbidden: Employees cannot access this resource" });
}
//Kiểm tra phải nhân viên không
module.exports = { isAuthenticated, isAdmin, isEmployee };
