const mongoose = require("mongoose");

const TheoDoiMuonSachSchema = new mongoose.Schema(
  {
    MaDocGia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocGia",
      required: true,
    },
    MaSach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sach",
      required: true,
    },
    NgayMuon: { type: Date, required: true, default: Date.now },
    NgayTra: {
      type: Date,
      required: true,
      default: Date.now() + 7 * 24 * 60 * 60 * 1000, //Tối đa 7 ngày mượn
    },
    MaNV: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NhanVien",
      required: true,
    },
    TrangThai: {
      type: String,
      enum: ["Chưa trả", "Đã trả"],
      default: "Chưa trả",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TheoDoiMuonSach", TheoDoiMuonSachSchema);
