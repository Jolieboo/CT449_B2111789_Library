const mongoose = require("mongoose");

const DocgiaSchema = new mongoose.Schema(
  {
    HoLot: { type: String, required: true, min: 2, max: 100 },
    Ten: { type: String, required: true, min: 2, max: 100 },
    NgaySinh: { type: Date, required: true },
    Phai: { type: String, enum: ["Nam", "Nu", "Khac"], required: true },
    DiaChi: { type: String, required: true },
    DienThoai: { type: String, required: true },
  },
  { timestamps: true }
);

// Tự động sinh MaDocGia dựa trên _id
DocgiaSchema.virtual("MaDocGia").get(function () {
  return this._id;
});

module.exports = mongoose.model("DocGia", DocgiaSchema);
