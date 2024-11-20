const express = require("express");
const NXB = require("../controllers/NhaXuatBan.controller");
const router = express.Router();

router
  .route("/")
  .post(NXB.createNXB)
  .get(NXB.findNXBbyTen)
  .delete(NXB.deleteAll);

router
  .route("/:id")
  .put(NXB.updateNXB)
  .delete(NXB.deleteNXB)
  .get(NXB.findNXBbyID);

module.exports = router;
