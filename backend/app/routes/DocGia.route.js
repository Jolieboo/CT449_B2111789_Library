const express = require("express");
const DocGia = require("../controllers/DocGia.controller");

const router = express.Router();

router
  .route("/")
  .post(DocGia.createDocGia)
  .get(DocGia.findAll)
  .delete(DocGia.deleteAll);
router
  .route("/:id")
  .put(DocGia.updateDocGia)
  .delete(DocGia.deleteDocGia)
  .get(DocGia.findDocGiabyID);

module.exports = router;
