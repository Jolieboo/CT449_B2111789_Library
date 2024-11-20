const express = require("express");
const NhanVien = require("../controllers/NhanVien.controller");

const router = express.Router();

router
  .route("/")
  .post(NhanVien.createNV)
  .delete(NhanVien.deleteAllNV)
  .get(NhanVien.getAll);
router
  .route("/:id")
  .patch(NhanVien.updateNV)
  .get(NhanVien.findNVById)
  .delete(NhanVien.deleteNVById);
router.get("/phone/:soDienThoai", NhanVien.findNVBySoDienThoai);
router.get("/name/:hotenNV", NhanVien.findNVByName);
module.exports = router;
