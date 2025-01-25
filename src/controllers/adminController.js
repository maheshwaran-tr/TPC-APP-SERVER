import adminService from "../services/adminService.js";

const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.json(admins);
  } catch (error) {
    const err = new Error(`Error in getting admins - ${error.message}`);
    err.statusCode = 400;
    next(err);
  }
};

const getAdminById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const admin = await adminService.getAdminById(id);
    res.json(admin);
  } catch (error) {
    const err = new Error(`Error in getting admin - ${error.message}`);
    err.statusCode = 400;
    next(err);
  }
};

const getAdminByUserId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const admin = await adminService.getAdminByUserId(id);
    res.json(admin);
  } catch (error) {
    const err = new Error(`Error in getting admin - ${error.message}`);
    err.statusCode = 400;
    next(err);
  }
};

const createAdmin = async (req, res, next) => {
  try {
    const admin = await adminService.createAdmin(req.body);
    res.json(admin);
  } catch (error) {
    const err = new Error(`Error in creating admin - ${error.message}`);
    err.statusCode = 400;
    next(err);
  }
};

const updateAdmin = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const admin = await adminService.updateAdmin(id, req.body);
    res.json(admin);
  } catch (error) {
    const err = new Error(`Error in updating admin - ${error.message}`);
    err.statusCode = 400;
    next(err);
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const admin = await adminService.deleteAdmin(id);
    res.json(admin);
  } catch (error) {
    const err = new Error(`Error in deleting admin - ${error.message}`);
    err.statusCode = 400;
    next(err);
  }
};

export default {
  getAllAdmins,
  getAdminById,
  getAdminByUserId,
  createAdmin,
  updateAdmin,
  deleteAdmin
};
