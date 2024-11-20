const { request } = require("express");
const ApiError = require("../api-error");
const connectDB = require("../utils/mongodb.util");
const SachService = require("../services/Sach.service");
exports.createSach = async (req, res, next) => {
  try {
    const newSach = new SachService();
    const document = await newSach.createSach(req.body);
    return res.status(201).send({
      message: "Sách đã được thêm thành công",
      data: document,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi xảy ra trong quá trình thêm Sách" + error.message
      )
    );
  }
};

exports.updateSach = async (req, res, next) => {
  try {
    const newSach = new SachService();
    const document = await newSach.updateSach(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy sách với ID này"));
    }
    return res.status(200).send({
      message: "Sách đã được cập nhật thành công",
      data: document,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi xảy ra trong quá trình sửa Sach" + error.message
      )
    );
  }
};
exports.findSachbyID = async (req, res, next) => {
  try {
    const newSach = new SachService();
    const document = await newSach.findSachbyID(req.params.id);
    return res.status(200).send(document);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Có lỗi xảy ra trong quá trình tìm Sách bằng ID ${req.params.id}: ${error.message}`
      )
    );
  }
};

exports.findSachbyTen = async (req, res, next) => {
  let documents = [];
  try {
    const newSach = new SachService();
    const { TenSach } = req.query;
    if (TenSach) {
      documents = await newSach.findSachbyTen(TenSach);
    } else {
      documents = await newSach.find(req.query);
    }
    if (documents.length === 0) {
      return res.status(404).send({
        message: "Không tìm thấy sách nào với tên đã cho.",
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
        "Có lỗi xảy ra trong quá trình tìm Sách bằng tên: " + error.message
      )
    );
  }
};
exports.deleteSach = async (req, res, next) => {
  try {
    const newSach = new SachService();
    const deletedDocument = await newSach.deleteSach(req.params.id);

    return res.status(200).send({
      message: "Sach đã được xóa thành công",
      data: deletedDocument,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi xảy ra trong quá trình xóa Sách" + error.message
      )
    );
  }
};
exports.deleteAll = async (req, res, next) => {
  try {
    const newSach = new SachService();
    const deletedCount = await newSach.deleteAll();

    return res.status(200).send({
      message: `${deletedCount} Sách đã được xoá thành công`,
      data: deletedCount,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi xảy ra trong quá trình xóa Sách" + error.message
      )
    );
  }
};
exports.findSachByNXBName = async (req, res) => {
  const nxbName = req.query.TenNXB; // Lấy tên NXB từ query parameter

  if (!nxbName) {
    return res.status(400).json({ message: "Vui lòng cung cấp tên NXB." });
  }

  try {
    const sachService = new SachService();
    const books = await sachService.findSachByNXBName(nxbName);

    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sách nào với nhà xuất bản đã cho." });
    }

    return res.status(200).json({ data: books });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi khi tìm sách theo NXB: " + error.message });
  }
};
