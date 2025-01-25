import statusService from "../services/statusService.js";

const getAllStatuses = async (req, res, next) => {
  try {
    const statuses = await statusService.getAllStatuses();
    res.status(200).json(statuses);
  } catch (error) {
    const err = new Error(`Error while fetching all statuses - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

const getStatusById = async (req, res, next) => {
  try {
    const status = await statusService.getStatusById(parseInt(req.params.id));
    if (!status) {
      const err = new Error("Status not found");
      err.statusCode = 404;
      next(err);
    } else {
      res.status(200).json(status);
    }
  } catch (error) {
    const err = new Error(`Error while fetching status - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

const addStatus = async (req, res, next) => {
  try {
    const { status, description } = req.body;
    const newStatus = await statusService.addStatus({ status, description });
    res.status(201).json(newStatus);
  } catch (error) {
    const err = new Error(`Error while adding status - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { status, description } = req.body;
    const updatedStatus = await statusService.updateStatus(
      parseInt(req.params.id),
      { status, description }
    );
    res.status(200).json(updatedStatus);
  } catch (error) {
    const err = new Error(`Error while updating status - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

const deleteStatus = async (req, res, next) => {
  try {
    const deletedStatus = await statusService.deleteStatus(parseInt(req.params.id));
    res.status(200).json(deletedStatus);
  } catch (error) {
    const err = new Error(`Error while deleting status - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

export default {
  getAllStatuses,
  getStatusById,
  addStatus,
  updateStatus,
  deleteStatus,
};
