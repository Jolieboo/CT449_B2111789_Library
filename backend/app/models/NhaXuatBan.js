const mongoose = require("mongoose");

const NhaXuatBanSchema = new mongoose.Schema(
  {
    TenNXB: { type: String, required: true, min: 5, max: 100 },
    DiaChi: { type: String, required: true, max: 100, min: 5 },
  },
  { timestamps: true }
);

// Tự động sinh MaNXB dựa trên _id
NhaXuatBanSchema.virtual("MaNXB").get(function () {
  return this._id;
});

module.exports = mongoose.model("NhaXuatBan", NhaXuatBanSchema);
