const express = require("express");
const TheoDoiMuonSach = require("../controllers/TheoDoiMuonSach.controller");
const router = express.Router();

router
  .route("/")
  .post(TheoDoiMuonSach.createTheoDoiMuonSach)
  .get(TheoDoiMuonSach.getAll);
router
  .route("/:id")
  .patch(TheoDoiMuonSach.updateTheoDoiMuonSach)
  .delete(TheoDoiMuonSach.deleteMuonSach);
router.route("/TimBangNgayMuon/").get(TheoDoiMuonSach.findByNgayMuon);
router.route("/TimBangNgayTra/").get(TheoDoiMuonSach.findByNgayTra);

module.exports = router;
