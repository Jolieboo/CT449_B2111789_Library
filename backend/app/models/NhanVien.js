const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const NhanVienSchema = new mongoose.Schema(
  {
    HoTenNV: { type: String, required: true, max: 100, min: 4 },
    isAdmin: { type: Boolean, required: true, default: false },
    Password: { type: String, required: true, min: 8 },
    DiaChi: { type: String, required: true, min: 4 },
    SoDienThoai: { type: String, required: true, min: 10 },
  },
  { timestamps: true }
);

// // Mã hóa mật khẩu trước khi lưu
// NhanVienSchema.pre("save", async function (next) {
//   if (!this.isModified("Password")) return next();
//   this.Password = await bcrypt.hash(this.Password, 10);
//   next();
// });

// Phương thức xác thực mật khẩu

NhanVienSchema.virtual("MaNV").get(function () {
  return this._id;
});

module.exports = mongoose.model("NhanVien", NhanVienSchema);
