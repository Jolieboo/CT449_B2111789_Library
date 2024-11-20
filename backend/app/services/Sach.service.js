const mongoose = require("mongoose");
const Sach = require("../models/Sach");
const NXB = require("../models/NhaXuatBan");
const { ObjectId } = mongoose.Types;

class SachService {
  async createSach(SachData) {
    try {
      const nxb = await NXB.findById(SachData.MaNXB);
      if (!nxb) {
        throw new Error("Nhà xuất bản không tồn tại ");
      }
      const sach = new Sach(SachData);
      await sach.save();
      return sach;
    } catch (error) {
      throw new Error("Không thể thêm sách " + error.message);
    }
  }
  async updateSach(id, SachData) {
    try {
      const nxb = await NXB.findById(SachData.MaNXB);
      if (!nxb) {
        throw new Error("Nhà xuất bản không tồn tại ");
      }
      const updatedSach = await Sach.findByIdAndUpdate(id, SachData, {
        new: true,
      });
      if (!updatedSach) {
        throw new Error("Không thể tìm thấy Sach với ID này");
      }
      return updatedSach;
    } catch (error) {
      throw new error("Không thể cập nhật sách ");
    }
  }
  async findSachbyID(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("ID không đúng định dạng");
      }
      const findSachID = await Sach.findOne({ _id: id });
      if (!findSachID) {
        throw new Error("ID không tồn tại");
      }
      return findSachID;
    } catch (error) {
      throw new Error("Không tìm thấy sách với ID này" + error.message);
    }
  }
  async find(filter = {}) {
    return await Sach.find(filter);
  }
  async findSachbyTen(TenSach) {
    try {
      return await Sach.find({ TenSach: new RegExp(TenSach, "i") });
    } catch (error) {
      throw new Error("Không thể tìm thấy sách: " + error.message);
    }
  }

  async deleteSach(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("ID không đúng định dạng");
      }

      const deletedSach = await Sach.findByIdAndDelete(id);
      if (!deletedSach) {
        throw new Error("Không tìm thấy Sach với ID này");
      }
      return deletedSach;
    } catch (error) {
      throw new Error("Không thể xóa Sach: " + error.message);
    }
  }
  async deleteAll() {
    try {
      const result = await Sach.deleteMany({});
      return result.deletedCount;
    } catch (error) {
      throw new Error("Không thể xoá tất cả Sách");
    }
  }
  async findSachByNXBName(nxbName) {
    try {
      // Tìm NXB theo tên
      const nxb = await NXB.findOne({
        TenNXB: new RegExp(nxbName, "i"),
      });

      if (!nxb) {
        throw new Error("Nhà xuất bản không tồn tại.");
      }

      // Nếu tìm thấy NXB, tìm sách có MaNXB tương ứng
      const books = await Sach.find({ MaNXB: nxb._id }).populate(
        "MaNXB",
        "TenNXB DiaChi"
      );

      return books;
    } catch (error) {
      throw new Error("Không thể tìm sách theo NXB: " + error.message);
    }
  }
}

module.exports = SachService;
