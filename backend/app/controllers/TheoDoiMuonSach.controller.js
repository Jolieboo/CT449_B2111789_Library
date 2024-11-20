const { request } = require("express");
const TheoDoiMuonSachService = require("../services/TheoDoiMuonSach.service");
const ApiError = require("../api-error");

exports.createTheoDoiMuonSach = async (req, res, next) => {
  try {
    const service = new TheoDoiMuonSachService();
    const record = await service.createTheoDoiMuonSach(req.body);

    return res.status(201).json({
      message: "Bản ghi theo dõi mượn sách đã được tạo thành công",
      data: record,
    });
  } catch (error) {
    return next(
      new ApiError(500, `Có lỗi trong quá trình tạo bản ghi: ${error.message}`)
    );
  }
};

exports.updateTheoDoiMuonSach = async (req, res, next) => {
  try {
    const service = new TheoDoiMuonSachService();
    const record = await service.updateTheoDoiMuonSach(req.params.id, req.body);

    return res.status(200).json({
      message: "Bản ghi theo dõi mượn sách đã được cập nhật thành công",
      data: record,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Có lỗi trong quá trình cập nhật bản ghi: ${error.message}`
      )
    );
  }
};
exports.findByNgayMuon = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    // Kiểm tra nếu không có giá trị startDate hoặc endDate
    if (!startDate || !endDate) {
      return next(new ApiError(400, "startDate và endDate là bắt buộc"));
    }

    const service = new TheoDoiMuonSachService();
    const records = await service.findTheoDoiMuonSachByNgayMuon(
      new Date(startDate),
      new Date(endDate)
    );

    return res.status(200).json({
      message: "Dữ liệu theo dõi mượn sách đã được lấy thành công",
      data: records,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Có lỗi trong quá trình tìm bản ghi theo ngày mượn: ${error.message}`
      )
    );
  }
};

exports.findByNgayTra = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    // Kiểm tra nếu không có giá trị startDate hoặc endDate
    if (!startDate || !endDate) {
      return next(new ApiError(400, "startDate và endDate là bắt buộc"));
    }

    const service = new TheoDoiMuonSachService();
    const records = await service.findTheoDoiMuonSachByNgayTra(
      new Date(startDate),
      new Date(endDate)
    );

    return res.status(200).json({
      message: "Dữ liệu theo dõi trả sách đã được lấy thành công",
      data: records,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Có lỗi trong quá trình tìm bản ghi theo ngày trả: ${error.message}`
      )
    );
  }
};
exports.getTheoDoiMuonSachDetails = async (req, res, next) => {
  try {
    const service = new TheoDoiMuonSachService();
    const record = await service.getTheoDoiMuonSachDetails(req.params.id);

    return res.status(200).json(record);
  } catch (error) {
    return next(
      new ApiError(500, `Có lỗi khi lấy chi tiết mượn sách: ${error.message}`)
    );
  }
};
exports.deleteMuonSach = async (req, res, next) => {
  try {
    const service = new TheoDoiMuonSachService();
    const deletedDocument = await service.deleteMuonSach(req.params.id);

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

exports.getAll = async (req, res, next) => {
  try {
    const service = new TheoDoiMuonSachService();
    const getAllTDMS = await service.getAllTheoDoiMuonSach();
    return res.status(200).json(getAllTDMS);
  } catch (error) {
    new ApiError(500, "Có lỗi xảy ra trong quá trình tìm Sách" + error.message);
  }
};
