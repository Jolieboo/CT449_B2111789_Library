const mongoose = require("mongoose");
require("dotenv").config(); // Để sử dụng biến môi trường từ file .env

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Không cần `useNewUrlParser` và `useUnifiedTopology`
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Thoát nếu kết nối thất bại
  }
}
module.exports = connectDB;
