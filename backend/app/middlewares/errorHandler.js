const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Mã lỗi mặc định là 500 (Internal Server Error)
  const message = err.message || "Lỗi hệ thống"; // Thông báo mặc định

  res.status(statusCode).json({
    error: {
      message: err.message,
      SoDienThoai: err.errors?.SoDienThoai || null, // Chỉ định lỗi cụ thể
      Password: err.errors?.Password || null,
    },
  });
};

module.exports = errorHandler;
