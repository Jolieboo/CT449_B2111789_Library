const mongoose = require("mongoose");
const NXB = require("../models/NhaXuatBan");
const Sach = require("../models/Sach");
const { ObjectId } = mongoose.Types;

class NhaXuatBanService {
  async createNXB(NXBData) {
    // changed CreateNXB to createNXB
    try {
      const nxb = new NXB(NXBData); // Khởi tạo một instance mới của NXB
      await nxb.save(); // Lưu vào cơ sở dữ liệu
      return nxb; // Trả về tài liệu vừa tạo
    } catch (error) {
      throw new Error("Không thể thêm nhà xuất bản: " + error.message); // Xử lý lỗi
    }
  }
  async updateNXB(id, payload) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("ID không đúng định dạng");
      }

      const updatedNXB = await NXB.findByIdAndUpdate(id, payload, {
        new: true,
      });
      //tìm xem có độc giá có id đó không
      if (!updatedNXB) {
        throw new Error("No NXB found with this ID");
      }

      return updatedNXB; //save
    } catch (error) {
      throw new Error("Không thể cập nhật NXB: " + error.message);
    }
  }
  async deleteNXB(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("ID không đúng định dạng");
      }

      const deletedNXB = await NXB.findByIdAndDelete(id);
      if (!deletedNXB) {
        throw new Error("Không tìm thấy NXB với ID này");
      }
      return deletedNXB;
    } catch (error) {
      throw new Error("Không thể xóa NXB: " + error.message);
    }
  }
  async findNXBbyID(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("ID không đúng định dạng");
      }
      const findNXBId = await NXB.findOne({ _id: id });
      if (!findNXBId) {
        throw new Error("Không tìm thấy NXB");
      }
      return findNXBId;
    } catch (error) {
      throw new Error("Không thể tìm NXB với ID này");
    }
  }
  async find(filter = {}) {
    return await NXB.find(filter);
  }
  async findNXBbyTen(ten) {
    try {
      return await NXB.find({ TenNXB: new RegExp(ten, "i") });
    } catch (error) {
      throw new Error("Không thể tìm thấy NXB: " + error.message);
    }
  }

  async deleteAll() {
    try {
      const result = await NXB.deleteMany({});
      return result.deletedCount;
    } catch (error) {
      throw new Error("Không thể xoá tất cả NXB");
    }
  }
  async findSachByNXBName(tenNXB) {
    try {
      // Tìm nhà xuất bản dựa trên tên
      const nxb = await NXB.findOne({ TenNXB: tenNXB });
      if (!nxb) {
        throw new Error("Không tìm thấy nhà xuất bản với tên này");
      }

      // Tìm sách dựa trên MaNXB của nhà xuất bản tìm được
      const sachList = await Sach.find({ MaNXB: nxb._id });

      // Kiểm tra nếu không có sách nào được tìm thấy
      if (sachList.length === 0) {
        throw new Error("Không có sách nào của nhà xuất bản này");
      }

      return sachList;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = NhaXuatBanService;
