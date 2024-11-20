const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const NV = require("../models/NhanVien");
const { ObjectId } = mongoose.Types;

class NhanVienService {
  async createNV(nvData) {
    try {
      const {
        HoTenNV,
        Password,
        ConfirmPassword,
        isAdmin, // thêm trường isAdmin nếu cần thiết
        DiaChi,
        SoDienThoai,
      } = nvData;

      if (Password !== ConfirmPassword) {
        throw new Error("Mật khẩu không khớp."); // Kiểm tra mật khẩu có khớp không
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(Password, 10);

      // Tạo đối tượng nhân viên mới
      const newNV = new NV({
        HoTenNV,
        Password: hashedPassword,
        isAdmin,
        DiaChi,
        SoDienThoai,
      });

      // Lưu nhân viên vào cơ sở dữ liệu
      await newNV.save();
      return newNV;
    } catch (error) {
      throw new Error(`Có lỗi trong quá trình tạo nhân viên: ${error.message}`);
    }
  }
  async findNVbyID(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("ID không đúng định dạng");
      }
      const nhanVien = await NV.findById(id);
      if (!nhanVien) {
        throw new Error("Nhân viên không tồn tại");
      }
      return nhanVien;
    } catch (error) {}
  }
  async updateNV(id, data) {
    try {
      const { Password, ConfirmPassword, ...updateData } = data;

      // Tìm nhân viên theo ID
      const nhanVien = await NV.findById(id);
      if (!nhanVien) {
        throw new Error("Nhân viên không tồn tại");
      }

      // Xử lý cập nhật mật khẩu nếu có
      if (Password) {
        if (Password !== ConfirmPassword) {
          throw new Error("Mật khẩu và mật khẩu xác nhận không khớp");
        }
        // Mã hóa mật khẩu mới và cập nhật
        const hashedPassword = await bcrypt.hash(Password, 10);
        nhanVien.Password = hashedPassword;
      }

      // Cập nhật các trường khác
      Object.assign(nhanVien, updateData);

      // Lưu các thay đổi
      await nhanVien.save();

      return nhanVien;
    } catch (error) {
      throw new Error(
        `Có lỗi trong quá trình cập nhật nhân viên: ${error.message}`
      );
    }
  }

  async findBySoDienThoai(soDienThoai) {
    try {
      const nhanVien = await NV.findOne({ SoDienThoai: soDienThoai }); // Find by SoDienThoai (phone number)
      if (!nhanVien) {
        throw new Error(404, "Nhân viên không tồn tại");
      }
      return nhanVien;
    } catch (error) {
      throw new Error(500, "Có lỗi xảy ra khi tìm nhân viên");
    }
  }
  async findByName(hoTenNV) {
    try {
      // Use regular expression to search case-insensitively
      const nhanVien = await NV.findone({
        HoTenNV: { $regex: new RegExp(hoTenNV, "i") }, // "i" for case-insensitive matching
      });

      if (!nhanVien) {
        throw new Error(404, "Nhân viên không tồn tại");
      }
      return nhanVien;
    } catch (error) {
      throw new Error(500, "Có lỗi xảy ra khi tìm nhân viên");
    }
  }
  async find(filter = {}) {
    return await NV.find(filter);
  }
  async deleteById(id) {
    try {
      const nhanVien = await NV.findByIdAndDelete(id); // Find by MongoDB ObjectId and delete
      if (!nhanVien) {
        throw new Error(404, "Nhân viên không tồn tại");
      }
      return nhanVien;
    } catch (error) {
      throw new Error(500, "Có lỗi xảy ra khi xóa nhân viên");
    }
  }
  async deleteAll() {
    try {
      const result = await NV.deleteMany(); // Delete all employees
      if (result.deletedCount === 0) {
        throw new Error(404, "Không có nhân viên để xóa");
      }
      return result;
    } catch (error) {
      throw new Error(500, "Có lỗi xảy ra khi xóa tất cả nhân viên");
    }
  }
}

module.exports = NhanVienService;
