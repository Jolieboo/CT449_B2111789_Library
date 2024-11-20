const { request } = require("express");
const ApiError = require("../api-error");
const connectDB = require("../utils/mongodb.util");
const DocGiaService = require("../services/DocGia.service");

//create and save a new DocGia

exports.createDocGia = async (req, res, next) => {
  try {
    const newDocGia = new DocGiaService();
    const document = await newDocGia.createDocGia(req.body);
    return res.status(201).send({
      message: "Độc giả đã được thêm thành công",
      data: document,
    });
  } catch (error) {
    return next(new ApiError(500, "Có lỗi xảy ra trong quá trình tạo độc giả"));
  }
};

exports.updateDocGia = async (req, res, next) => {
  try {
    const newDocGia = new DocGiaService();
    const document = await newDocGia.updateDocGia(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy độc giả với ID này"));
    }
    return res.status(200).send({
      message: "Độc giả đã được chỉnh sửa thành công",
      data: document,
    }); // Send updated document
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi xảy ra trong quá trình cập nhật độc giả" + error.message
      )
    );
  }
};

exports.deleteDocGia = async (req, res, next) => {
  try {
    const docGiaService = new DocGiaService();
    const deletedDocument = await docGiaService.deleteDocGia(req.params.id);

    return res.status(200).send({
      message: "Độc giả đã được xóa thành công",
      data: deletedDocument,
    });
  } catch (error) {
    return next(new ApiError(500, "Có lỗi xảy ra trong quá trình xóa độc giả"));
  }
};

exports.findDocGiabyID = async (req, res, next) => {
  try {
    const docGiaService = new DocGiaService();
    const document = await docGiaService.findDocGiabyId(req.params.id);

    return res.status(200).send(document);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Có lỗi xảy ra trong quá trình tìm độc giả bằng ID ${req.params.id}: ${error.message}`
      )
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const docGiaService = new DocGiaService();
    const { Ten } = req.query; // Get the 'Ten' query parameter

    // Check if a 'Ten' parameter was provided
    if (Ten) {
      documents = await docGiaService.findDocGiaByTen(Ten); // Call the service method to find by name
    } else {
      console.log(docGiaService);
      documents = await docGiaService.find(req.query); // If no 'Ten' parameter, get all độc giả
    }

    if (documents.length === 0) {
      return res.status(404).send({
        message: "Không tìm thấy độc giả nào với tên đã cho.",
        data: [], // You can return an empty array or null
      });
    }

    return res.status(200).send({
      data: documents, // Send the documents back in the response
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi xảy ra trong quá trình tìm độc giả: " + error.message
      )
    );
  }
};
exports.deleteAll = async (req, res, next) => {
  try {
    const docGiaService = new DocGiaService();
    const deletedCount = await docGiaService.deleteAll();

    return res.status(200).send({
      message: `${deletedCount} độc giả đã được xoá thành công`,
      data: deletedCount,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi xảy ra trong quá trình xóa độc giả" + error.message
      )
    );
  }
};
