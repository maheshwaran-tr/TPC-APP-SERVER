import trainingService from "../services/trainingService.js";

// Controller to get all trainings
const getAllTrainings = async (req, res, next) => {
  try {
    const trainings = await trainingService.getAllTrainings();
    res.status(200).json(trainings);
  } catch (error) {
    const err = new Error(`Error while fetching all trainings - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

// Controller to get a training by ID
const getTrainingById = async (req, res, next) => {
  const id = parseInt(req.params.id); // Parse ID as an integer
  if (isNaN(id)) {
    const err = new Error("Invalid ID format");
    err.statusCode = 400;
    return next(err);
  }
  try {
    const training = await trainingService.getTrainingById(id);
    if (!training) {
      const err = new Error(`Training with ID ${id} not found`);
      err.statusCode = 404;
      next(err);
    } else {
      res.status(200).json(training);
    }
  } catch (error) {
    const err = new Error(
      `Error while fetching training by ID - ${error.message}`
    );
    err.statusCode = 500;
    next(err);
  }
};

// Controller to add a new training
const addTraining = async (req, res, next) => {
  try {
    const newTraining = await trainingService.addTraining(req.body);
    res.status(201).json(newTraining);
  } catch (error) {
    const err = new Error(`Error while adding training - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

// Controller to update a training
const updateTraining = async (req, res, next) => {
  const id = parseInt(req.params.id); // Parse ID as an integer
  if (isNaN(id)) {
    const err = new Error("Invalid ID format");
    err.statusCode = 400;
    return next(err);
  }
  try {
    const updatedTraining = await trainingService.updateTraining(id, req.body);
    res.status(200).json(updatedTraining);
  } catch (error) {
    const err = new Error(`Error while updating training - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

// Controller to delete a training
const deleteTraining = async (req, res, next) => {
  const id = parseInt(req.params.id); // Parse ID as an integer
  if (isNaN(id)) {
    const err = new Error("Invalid ID format");
    err.statusCode = 400;
    return next(err);
  }
  try {
    await trainingService.deleteTraining(id);
    res.status(204).json({ message: "Training deleted successfully" });
  } catch (error) {
    const err = new Error(`Error while deleting training - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

export default {
  getAllTrainings,
  getTrainingById,
  addTraining,
  updateTraining,
  deleteTraining,
};