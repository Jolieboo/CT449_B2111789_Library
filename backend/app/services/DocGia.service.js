const mongoose = require("mongoose");
const DocGia = require("../models/DocGia");
const { ObjectId } = mongoose.Types;

class DocGiaService {
  async createDocGia(docGiaData) {
    try {
      const docGia = new DocGia(docGiaData); // Khởi tạo một instance mới của Docgia
      await docGia.save(); // Lưu vào cơ sở dữ liệu
      return docGia; // Trả về tài liệu vừa tạo
    } catch (error) {
      throw new Error("Không thể tạo Độc giả: " + error.message); // Xử lý lỗi
    }
  }

  async updateDocGia(id, payload) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("ID không đúng định dạng");
      }

      const updatedDocGia = await DocGia.findByIdAndUpdate(id, payload, {
        new: true,
      });
      //tìm xem có độc giá có id đó không
      if (!updatedDocGia) {
        throw new Error("No DocGia found with this ID");
      }

      return updatedDocGia; //save
    } catch (error) {
      throw new Error("Không thể cập nhật Độc giả: " + error.message);
    }
  }
  async deleteDocGia(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("ID không đúng định dạng");
      }

      const deletedDocGia = await DocGia.findByIdAndDelete(id);

      if (!deletedDocGia) {
        throw new Error("Không tìm thấy độc giả với ID này");
      }

      return deletedDocGia;
    } catch (error) {
      throw new Error("Không thể xóa Độc giả: " + error.message);
    }
  }
  async findDocGiabyId(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("ID không đúng định dạng");
      }
      const findDocGiaId = await DocGia.findOne({ _id: id });
      if (!findDocGiaId) {
        throw new Error("Không tìm thấy độc giả với ID này");
      }
      return findDocGiaId;
    } catch (error) {
      throw new Error("Không thể tìm Độc giả: " + error.message);
    }
  }
  async find(filter = {}) {
    return await DocGia.find(filter);
  }
  async findDocGiaByTen(ten) {
    try {
      return await DocGia.find({ Ten: new RegExp(ten, "i") }); // Use a regex for case-insensitive search
    } catch (error) {
      throw new Error("Không thể tìm Độc giả: " + error.message);
    }
  }
  async deleteAll() {
    try {
      const result = await DocGia.deleteMany({});
      return result.deletedCount;
    } catch (error) {
      throw new Error("Không thể xoá tất cả độc giả");
    }
  }
}

module.exports = DocGiaService; // Xuất service
