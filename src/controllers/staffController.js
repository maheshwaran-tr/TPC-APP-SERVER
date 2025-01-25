import staffService from "../services/staffService.js";

const getAllStaffs = async (req, res, next) => {
  try {
    const staffs = await staffService.getAllStaffs();
    res.status(200).json(staffs);
  } catch (error) {
    const err = new Error(
      `An error occurred while fetching staffs - ${error.message}`
    );
    err.statusCode = 400;
    next(err);
  }
};

const getStaffByUserId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const staff = await staffService.getStaffByUserId(id);
    res.status(200).json(staff);
  } catch (error) {
    const err = new Error(
      `An error occurred while fetching staff - ${error.message}`
    );
    err.statusCode = 400;
    next(err);
  }
};

const getByStaffId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const staff = await staffService.getByStaffId(id);
    res.status(200).json(staff);
  } catch (error) {
    const err = new Error(
      `An error occurred while fetching staff - ${error.message}`
    );
    err.statusCode = 400;
    next(err);
  }
};

const createStaff = async (req, res, next) => {
  try {
    const staff = await staffService.createStaff(req.body);
    res.status(201).json(staff);
  } catch (error) {
    const err = new Error(
      `An error occurred while creating staff - ${error.message}`
    );
    err.statusCode = 400;
    next(err);
  }
};

const updateByStaffId = async (req, res, next) => {
  try {
    const staff = await staffService.updateByStaffId(
      req.params.staffId,
      req.body
    );
    res.status(200).json(staff);
  } catch (error) {
    const err = new Error(
      `An error occurred while updating staff - ${error.message}`
    );
    err.statusCode = 400;
    next(err);
  }
};

const deleteByStaffId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deletedStaff = await staffService.deleteByStaffId(id);
    res.json(deletedStaff);
  } catch (error) {
    const err = new Error(
      `An error occurred while deleting staff - ${error.message}`
    );
    err.statusCode = 400;
    next(err);
  }
};

export default {
  getAllStaffs,
  getStaffByUserId,
  getByStaffId,
  createStaff,
  updateByStaffId,
  deleteByStaffId,
};
