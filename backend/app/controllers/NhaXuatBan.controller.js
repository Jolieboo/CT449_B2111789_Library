const { request } = require("express");
const ApiError = require("../api-error");
const connectDB = require("../utils/mongodb.util");
const NhaXuatBanService = require("../services/NhaXuatBan.service");
const SachService = require("../services/Sach.service");
exports.createNXB = async (req, res, next) => {
  try {
    const newNXB = new NhaXuatBanService();
    const document = await newNXB.createNXB(req.body); // changed createNXB to match service
    return res.status(201).send({
      message: "Nhà xuất bản đã được thêm thành công",
      data: document,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Có lỗi xảy ra trong quá trình thêm nhà xuất bản")
    );
  }
};

exports.updateNXB = async (req, res, next) => {
  try {
    const newNXB = new NhaXuatBanService();
    const document = await newNXB.updateNXB(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy NXB với ID này"));
    }
    return res.status(200).send({
      message: "NXB đã được chỉnh sửa thành công",
      data: document,
    }); // Send updated document
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi xảy ra trong quá trình cập nhật NXB" + error.message
      )
    );
  }
};

exports.deleteNXB = async (req, res, next) => {
  try {
    const nxbService = new NhaXuatBanService();
    const deletedDocument = await nxbService.deleteNXB(req.params.id);

    return res.status(200).send({
      message: "NXB đã được xóa thành công",
      data: deletedDocument,
    });
  } catch (error) {
    return next(new ApiError(500, "Có lỗi xảy ra trong quá trình xóa NXB"));
  }
};

exports.findNXBbyID = async (req, res, next) => {
  try {
    const nxbService = new NhaXuatBanService();
    const document = await nxbService.findNXBbyID(req.params.id);
    return res.status(200).send(document);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Có lỗi xảy ra trong quá trình tìm NXB bằng ID ${req.params.id}: ${error.message}`
      )
    );
  }
};

exports.findNXBbyTen = async (req, res, next) => {
  let documents = [];
  try {
    const nxbService = new NhaXuatBanService();
    const { TenNXB } = req.query;
    if (TenNXB) {
      documents = await nxbService.findNXBbyTen(TenNXB);
    } else {
      documents = await nxbService.find(req.query);
    }
    if (documents.length === 0) {
      return res.status(404).send({
        message: "Không tìm thấy NXB nào với tên đã cho.",
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
        "Có lỗi xảy ra trong quá trình tìm NXB bằng tên: " + error.message
      )
    );
  }
};
exports.deleteAll = async (req, res, next) => {
  try {
    const nxbService = new NhaXuatBanService();
    const deletedCount = await nxbService.deleteAll();

    return res.status(200).send({
      message: `${deletedCount} NXB đã được xoá thành công`,
      data: deletedCount,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Có lỗi xảy ra trong quá trình xóa NXB" + error.message)
    );
  }
};
// exports.findSachByTenNXB = async (req, res) => {
//   let documents = [];
//   try {
//     const newSach = new SachService();
//     const { TenNXB } = req.query;
//     res.status(200).json(sachList);
//     if (TenNXB) {
//       documents = await newSach.findNXBbyTen(TenNXB);
//     } else {
//       documents = await newSach.find({});
//     }
//     if (documents.length === 0) {
//       return res.status(404).send({
//         message: "Không tìm thấy sach nào với NXB đã cho.",
//         data: [],
//       });
//     }
//     return res.status(200).send({
//       data: documents, // Send the documents back in the response
//     });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
