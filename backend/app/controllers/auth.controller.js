const authService = require("../services/auth.service");
const ApiError = require("../api-error"); // Tùy chọn, để xử lý lỗi

// const { error } = require("console");
// const NhanVienService = require("../services/NhanVien.service");

exports.login = async (req, res, next) => {
  try {
    const { SoDienThoai, Password } = req.body;

    const nhanVien = await authService.login(SoDienThoai, Password);

    req.session.nhanVienId = nhanVien._id;
    res.status(200).json({ message: "Đăng nhập thành công", data: nhanVien });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Lỗi khi đăng xuất" });
    res.json({ message: "Đăng xuất thành công" });
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Lỗi khi đăng xuất" });
    res.json({ message: "Đăng xuất thành công" });
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Lỗi khi đăng xuất" });
    res.json({ message: "Đăng xuất thành công" });
  });
};
