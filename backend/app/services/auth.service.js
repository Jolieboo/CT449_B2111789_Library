const { constants } = require("fs");
const NV = require("../models/NhanVien");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const ApiError = require("../api-error");
// const { ObjectId } = mongoose.Types;

class authService {
  async login(SoDienThoai, Password) {
    const nv = await NV.findOne({ SoDienThoai });
    if (!nv) {
      throw new ApiError(404, "Không tìm thấy nhân viên có SĐT");
    }
    const isValidPassword = await bcrypt.compare(Password, nv.Password);
    await console.log(Password);
    await console.log(nv.Password);
    if (!isValidPassword) {
      throw new ApiError(401, "Sai mật khẩu");
    }
    return nv;
  }
}

module.exports = new authService(); // Đảm bảo export instance của authService
