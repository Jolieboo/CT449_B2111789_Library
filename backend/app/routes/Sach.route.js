const express = require("express");
const Sach = require("../controllers/Sach.controller");

const router = express.Router();
router
  .route("/")
  .post(Sach.createSach)
  .get(Sach.findSachbyTen)
  .delete(Sach.deleteAll);
router.route("/nxb").get(Sach.findSachByNXBName);

router
  .route("/:id")
  .put(Sach.updateSach)
  .get(Sach.findSachbyID)
  .delete(Sach.deleteSach);

module.exports = router;
