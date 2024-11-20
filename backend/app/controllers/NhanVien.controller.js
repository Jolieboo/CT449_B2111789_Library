const { request } = require("express");
const ApiError = require("../api-error");
// const connectDB = require("../utils/mongodb.util");
const NhanVienService = require("../services/NhanVien.service");

exports.createNV = async (req, res, next) => {
  try {
    const newNV = new NhanVienService();
    const document = await newNV.createNV(req.body);

    return res.status(201).send({
      message: "Nhân viên đã được thêm thành công",
      data: document,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi xảy ra trong quá trình tạo nhân viên" + error.message
      )
    );
  }
};
exports.updateNV = async (req, res, next) => {
  try {
    const { id } = req.params; // Employee ID from the route parameter
    const nhanVienService = new NhanVienService();
    const updatedNV = await nhanVienService.updateNV(id, req.body);

    return res.status(200).send({
      message: "Nhân viên đã được cập nhật thành công",
      data: updatedNV,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi xảy ra trong quá trình cập nhật nhân viên: " + error.message
      )
    );
  }
};

exports.findNVById = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the employee ID from the URL parameter
    const nhanVienService = new NhanVienService();
    const nhanVien = await nhanVienService.findNVbyID(id);

    return res.status(200).send({
      message: "Tìm thấy nhân viên",
      data: nhanVien,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi xảy ra khi tìm nhân viên theo ID: " + error.message
      )
    );
  }
};

exports.findNVBySoDienThoai = async (req, res, next) => {
  try {
    const { soDienThoai } = req.params; // Get the phone number from the URL parameter
    const nhanVienService = new NhanVienService();
    const nhanVien = await nhanVienService.findBySoDienThoai(soDienThoai);

    return res.status(200).send({
      message: "Nhân viên tìm thấy",
      data: nhanVien,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi xảy ra khi tìm nhân viên theo SĐT: " + error.message
      )
    );
  }
};
exports.findNVByName = async (req, res, next) => {
  try {
    const { hoTenNV } = req.params; // Get the employee's name from the URL parameter
    const nhanVienService = new NhanVienService();
    const nhanVien = await nhanVienService.findByName(hoTenNV);

    return res.status(200).send({
      message: "Tìm thấy nhân viên",
      data: nhanVien,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi xảy ra khi tìm nhân viên theo tên: " + error.message
      )
    );
  }
};
exports.deleteNVById = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the employee ID from the URL parameter
    const nhanVienService = new NhanVienService();
    const nhanVien = await nhanVienService.deleteById(id);

    return res.status(200).send({
      message: "Nhân viên đã được xóa thành công",
      data: nhanVien,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi xảy ra khi xóa nhân viên theo ID: " + error.message
      )
    );
  }
};
exports.deleteAllNV = async (req, res, next) => {
  try {
    const nhanVienService = new NhanVienService();
    const result = await nhanVienService.deleteAll();
    return res.status(200).send({
      message: "Tất cả nhân viên đã được xóa thành công",
      data: result,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi xảy ra khi xóa tất cả nhân viên: " + error.message
      )
    );
  }
};
exports.getAll = async (req, res, next) => {
  try {
    const service = new NhanVienService();
    const getAllNV = await service.find();
    return res.status(200).json(getAllNV);
  } catch (error) {
    new ApiError(500, "Có lỗi xảy ra trong quá trình tìm Sách" + error.message);
  }
};
