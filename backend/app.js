const express = require("express");
const cors = require("cors");
const session = require("express-session");
const DocGiaRouter = require("./app/routes/DocGia.route");
const NXBRouter = require("./app/routes/NhaXuatBan.route");
const SachRouter = require("./app/routes/Sach.route");
const NVRouter = require("./app/routes/NhanVien.route");
const MuonSachRouter = require("./app/routes/TheoDoiMuonSach.route");
const authRouter = require("./app/routes/auth.route");
const ApiError = require("./app/api-error");
const app = express();
const errorHandler = require("./app/middlewares/errorHandler");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact Library Management" });
});
app.use(errorHandler);
app.use(
  session({
    secret: "secret-key", // Khóa bí mật để mã hóa session
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Đặt thành `true` nếu bạn sử dụng HTTPS
  })
);
app.use("/api/auth", authRouter);

app.get("/api/auth", (req, res) => {
  res.send("Chào mừng đến với đăng nhâp!");
});
app.use("/api/DocGia", DocGiaRouter);

app.get("/api/DocGia", (req, res) => {
  res.json({ message: "Welcome to Doc Gia table" });
});

app.use("/api/NXB", NXBRouter);
app.get("/api/NXB", (req, res) => {
  res.json({ message: "Welcome to NXB" });
});

app.use("/api/Sach", SachRouter);
app.get("/api/Sach", (req, res) => {
  res.json({ message: "Welcome to Sach" });
});

app.use("/api/NhanVien", NVRouter);
app.get("/api/NhanVien", (req, res) => {
  res.json({ message: "Welcome to Nhân viên" });
});

app.use("/api/MuonSach", MuonSachRouter);
// app.get("/api/MuonSach", (req, res) => {
//   res.json({ message: "Welcome to Mượn Sách" });
// });
app.use((req, res, next) => {
  //code ở đây sẽ chạy khi không có route được định nghĩa nào
  //khớp với yêu cầu, Gọi next() để chuyển sang middleware xử lí lỗi
  return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
  //MiddleWare xu li loi tap trung
  //trong cac code xu li o route, goi next(error)se chuyen ve midlleware xu li loi nayse chuyen ve midlleware xu li loi nay
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});
module.exports = app;
