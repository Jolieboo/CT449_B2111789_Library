const mongoose = require("mongoose");
const TheoDoiMuonSach = require("../models/TheoDoiMuonSach");
const Sach = require("../models/Sach");
const Docgia = require("../models/DocGia");
const NhanVien = require("../models/NhanVien");
const { ObjectId } = mongoose.Types;

class TheoDoiMuonSachService {
  async createTheoDoiMuonSach(data) {
    try {
      const docgiaExists = await Docgia.exists({ _id: data.MaDocGia });
      if (!docgiaExists) throw new Error("MaDocGia không tồn tại");

      const sachExists = await Sach.exists({ _id: data.MaSach });
      if (!sachExists) throw new Error("MaSach không tồn tại");

      const nhanVienExists = await NhanVien.exists({ _id: data.MaNV });
      if (!nhanVienExists) throw new Error("MaNV không tồn tại");
      const sach = await Sach.findById(data.MaSach);
      if (!sach) throw new Error("Sách không tồn tại");

      if (sach.kho <= 0) {
        throw new Error("Không thể mượn sách vì kho đã hết");
      }

      if (data.TrangThai === "Chưa trả") {
        // Giảm kho đi 1 nếu trạng thái là "Chưa trả"
        sach.kho -= 1;
      }

      // Lưu sách sau khi đã thay đổi kho
      await sach.save();
      const theoDoiMuonSach = new TheoDoiMuonSach(data);
      await theoDoiMuonSach.save();
      return theoDoiMuonSach;
    } catch (error) {
      throw new Error(
        `Có lỗi trong quá trình tạo bản ghi theo dõi mượn sách: ${error.message}`
      );
    }
  }

  async updateTheoDoiMuonSach(id, updateData) {
    try {
      // Tìm bản ghi theo ID
      const record = await TheoDoiMuonSach.findById(id);
      if (!record) throw new Error("Bản ghi không tồn tại");

      // Kiểm tra nếu có MaDocGia mới
      if (updateData.MaDocGia) {
        const docgiaExists = await Docgia.exists({ _id: updateData.MaDocGia });
        if (!docgiaExists) throw new Error("MaDocGia không tồn tại");
      }

      // Kiểm tra nếu có MaSach mới, nếu có thì tìm sách từ cơ sở dữ liệu
      let sach = null; // Khai báo sach
      if (updateData.MaSach) {
        const sachExists = await Sach.exists({ _id: updateData.MaSach });
        if (!sachExists) throw new Error("MaSach không tồn tại");

        // Lấy sách đầy đủ từ cơ sở dữ liệu
        sach = await Sach.findById(updateData.MaSach);
        if (!sach) throw new Error("Không thể tìm thấy sách");
      }

      if (updateData.MaNV) {
        const nhanVienExists = await NhanVien.exists({ _id: updateData.MaNV });
        if (!nhanVienExists) throw new Error("MaNV không tồn tại");
      }

      let khoChanged = false;

      // Kiểm tra nếu có thay đổi trạng thái
      if (updateData.TrangThai) {
        if (
          updateData.TrangThai === "Đã trả" &&
          record.TrangThai !== "Đã trả"
        ) {
          // Nếu trạng thái chuyển thành "Đã trả", tăng kho lên 1
          if (sach) {
            sach.kho += 1;
            khoChanged = true;
          } else {
            throw new Error("Không thể tìm thấy sách để cập nhật kho");
          }
        }
      }

      // Nếu kho đã thay đổi, lưu lại sách
      if (khoChanged && sach) {
        await sach.save();
      }

      // Cập nhật thông tin bản ghi với dữ liệu mới
      Object.assign(record, updateData);
      await record.save();
      return record;
    } catch (error) {
      throw new Error(
        `Có lỗi trong quá trình cập nhật bản ghi theo dõi mượn sách: ${error.message}`
      );
    }
  }

  async findTheoDoiMuonSachByNgayMuon(startDate, endDate) {
    try {
      const records = await TheoDoiMuonSach.find({
        NgayMuon: { $gte: startDate, $lte: endDate }, // Tìm các bản ghi có NgayMuon trong khoảng từ startDate đến endDate
      });
      if (!records)
        throw new Error("Không có người mượn sách trong khoảng thờ gian này");
      return records;
    } catch (error) {
      throw new Error(
        `Có lỗi trong quá trình tìm bản ghi theo dõi mượn sách theo ngày mượn: ${error.message}`
      );
    }
  }
  async findTheoDoiMuonSachByNgayTra(startDate, endDate) {
    try {
      const records = await TheoDoiMuonSach.find({
        NgayTra: { $gte: startDate, $lte: endDate }, // Tìm các bản ghi có NgayTra trong khoảng từ startDate đến endDate
      });
      if (!records)
        throw new Error("Không có người mượn sách trong khoảng thờ gian này");
      return records;
    } catch (error) {
      throw new Error(
        `Có lỗi trong quá trình tìm bản ghi theo dõi mượn sách theo ngày trả: ${error.message}`
      );
    }
  }
  async getTheoDoiMuonSachDetails(id) {
    try {
      const record = await TheoDoiMuonSach.findById(id);
      // Tham chiếu đến model NhanVien và chỉ lấy tên nhân viên
      // // Tham chiếu đến model Docgia và chỉ lấy tên

      if (!record) {
        throw new Error("Bản ghi không tồn tại");
      }

      return record;
    } catch (error) {
      throw new Error(`Có lỗi khi lấy chi tiết mượn sách: ${error.message}`);
    }
  }
  async getAllTheoDoiMuonSach() {
    try {
      const records = await TheoDoiMuonSach.find({}); // Lấy tất cả bản ghi trong bảng TheoDoiMuonSach
      return records;
    } catch (error) {
      throw new Error(
        "Lỗi khi lấy danh sách theo dõi mượn sách: " + error.message
      );
    }
  }
  // async find(filter = {}) {
  //   return await TheoDoiMuonSach.find(filter);
  // }
  async deleteMuonSach(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("ID không đúng định dạng");
      }

      const deletedMuonSach = await TheoDoiMuonSach.findByIdAndDelete(id);
      if (!deletedMuonSach) {
        throw new Error("Không tìm thấy bản ghi với ID này");
      }
      return deletedMuonSach;
    } catch (error) {
      throw new Error("Không thể xóa bản ghi: " + error.message);
    }
  }
}

module.exports = TheoDoiMuonSachService;
