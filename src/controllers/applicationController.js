import applicationService from "../services/applicationService.js";

// Apply for a drive
const applyForDrive = async (req, res, next) => {
  try {
    const { student_id, drive_id } = req.body;
    console.log(drive_id);

    const application = await applicationService.applyForDrive(parseInt(student_id), parseInt(drive_id));

    res.status(201).json(application);

  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    next(err);
  }
};

// Get all applications
const getAllApplications = async (req, res, next) => {
  try {
    const applications = await applicationService.getAllApplications();
    res.status(200).json(applications);

  } catch (error) {
    const err = new Error(`Error fetching applications - ${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

// Get application by ID
const getApplicationById = async (req, res, next) => {
  try {
    const { applicationId } = req.params;

    const application = await applicationService.getApplicationById(parseInt(applicationId));

    res.status(200).json(application);

  } catch (error) {
    const err = new Error(`Error fetching application by ID - ${error.message}`);
    err.statusCode = 400;
    next(err);
  }
};

// Update application status
const updateApplication = async (req, res, next) => {
  try {
    const { applicationId, statusId } = req.body;

    const updatedApplication = await applicationService.updateApplication(
      parseInt(applicationId),
      parseInt(statusId)
    );

    res.status(200).json(updatedApplication);

  } catch (error) {
    const err = new Error(`Error updating application - ${error.message}`);
    err.statusCode = 400;
    next(err);
  }
};

// Delete application
const deleteApplication = async (req, res, next) => {
  try {
    const { applicationId } = req.params;

    const deletedApplication = await applicationService.deleteApplication(parseInt(applicationId));

    res.status(200).json(deletedApplication);

  } catch (error) {
    const err = new Error(`Error deleting application - ${error.message}`);
    err.statusCode = 400;
    next(err);
  }
};

export default {
  applyForDrive,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
