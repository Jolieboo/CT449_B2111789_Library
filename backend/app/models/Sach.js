const mongoose = require("mongoose");

const SachSchema = new mongoose.Schema(
  {
    TenSach: { type: String, required: true, max: 100 },
    DonGia: { type: Number, required: true },
    SoQuyen: { type: Number, required: true },
    NamXuatBan: { type: Number, required: true },
    MaNXB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NhaXuatBan",
      required: true,
    },
    NguonGoc: { type: String, required: true },
    kho: { type: Number, default: 0 },
    // Có thế là TacGia
  },
  { timestamps: true }
);

// Tự động sinh MaSach dựa trên _id
SachSchema.virtual("MaSach").get(function () {
  return this._id;
});

SachSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("SoQuyen")) {
    this.kho = this.SoQuyen; // Đặt giá trị của "kho" bằng "SoQuyen"
  }
  next();
});
module.exports = mongoose.model("Sach", SachSchema);
