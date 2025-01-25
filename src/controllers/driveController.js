import driveService from "../services/driveService.js";

// Controller to get all drives
const getAllDrives = async (req, res, next) => {
  try {
    const drives = await driveService.getAllDrives();
    res.status(200).json(drives);
  } catch (error) {
    const err = new Error(`Error while fetching all drives - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

// Controller to get a drive by ID
const getDriveById = async (req, res, next) => {
  const id = parseInt(req.params.id); // Parse ID as an integer
  if (isNaN(id)) {
    const err = new Error("Invalid ID format");
    err.statusCode = 400;
    return next(err);
  }
  try {
    const drive = await driveService.getDriveById(id);
    if (!drive) {
      const err = new Error(`Drive with ID ${id} not found`);
      err.statusCode = 404;
      next(err);
    } else {
      res.status(200).json(drive);
    }
  } catch (error) {
    const err = new Error(
      `Error while fetching drive by ID - ${error.message}`
    );
    err.statusCode = 500;
    next(err);
  }
};

// Controller to add a new drive
const addDrive = async (req, res, next) => {
  try {
    const newDrive = await driveService.addDrive(req.body);
    res.status(201).json(newDrive);
  } catch (error) {
    const err = new Error(`Error while adding drive - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

const addMultipleDrive = async (req, res, next) => {
  const drives = req.body;
  for (let i = 0; i < drives.length; i++) {
    console.log(`Adding drive ${i + 1} of ${drives.length}`);
    try {
      const newDrive = await driveService.addDrive(drives[i]);
    } catch (error) {
      const err = new Error(`Error while adding drive - ${error.message}`);
      err.statusCode = 500;
      return next(err);
    }
    res.status(201).json({"message":"success"});
  }
};

// Controller to update a drive
const updateDrive = async (req, res, next) => {
  const id = parseInt(req.params.id); // Parse ID as an integer
  if (isNaN(id)) {
    const err = new Error("Invalid ID format");
    err.statusCode = 400;
    return next(err);
  }
  try {
    const updatedDrive = await driveService.updateDrive(id, req.body);
    res.status(200).json(updatedDrive);
  } catch (error) {
    const err = new Error(`Error while updating drive - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

// Controller to delete a drive
const deleteDrive = async (req, res, next) => {
  const id = parseInt(req.params.id); // Parse ID as an integer
  if (isNaN(id)) {
    const err = new Error("Invalid ID format");
    err.statusCode = 400;
    return next(err);
  }
  try {
    await driveService.deleteDrive(id);
    res.status(204).json({ message: "Drive deleted successfully" });
  } catch (error) {
    const err = new Error(`Error while deleting drive - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

export default {
  getAllDrives,
  getDriveById,
  addMultipleDrive,
  addDrive,
  updateDrive,
  deleteDrive,
};
