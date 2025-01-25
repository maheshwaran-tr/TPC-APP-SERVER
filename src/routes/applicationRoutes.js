import express from "express";
import applicationController from "../controllers/applicationController.js";

const router = express.Router();

// Route to apply for a drive
router.post("/apply", applicationController.applyForDrive);

// Route to get all applications
router.get("/", applicationController.getAllApplications);

// Route to get application by ID
router.get("/:applicationId", applicationController.getApplicationById);

// Route to update application status
router.put("/update", applicationController.updateApplication);

// Route to delete application
router.delete("/:applicationId", applicationController.deleteApplication);


export default router;