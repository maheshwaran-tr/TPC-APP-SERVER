import departmentService from "../services/departmentService.js";

const getAllDepartments = async (req, res, next) => {
  try {
    const departments = await departmentService.getAllDepartments();
    res.status(200).json(departments);
  } catch (error) {
    const err = new Error(`Error while fetching all departments - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

const getDepartmentById = async (req, res, next) => {
  try {
    const department = await departmentService.getDepartmentById(parseInt(req.params.id));
    if (!department) {
      const err = new Error("Department not found");
      err.statusCode = 404;
      next(err);
    } else {
      res.status(200).json(department);
    }
  } catch (error) {
    const err = new Error(`Error while fetching department - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

const addDepartment = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newDepartment = await departmentService.addDepartment({ name, description });
    res.status(201).json(newDepartment);
  } catch (error) {
    const err = new Error(`Error while adding department - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

const updateDepartment = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const updatedDepartment = await departmentService.updateDepartment(
      parseInt(req.params.id),
      { name, description }
    );
    res.status(200).json(updatedDepartment);
  } catch (error) {
    const err = new Error(`Error while updating department - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

const deleteDepartment = async (req, res, next) => {
  try {
    const deletedDepartment = await departmentService.deleteDepartment(parseInt(req.params.id));
    res.status(200).json(deletedDepartment);
  } catch (error) {
    const err = new Error(`Error while deleting department - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

export default {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
