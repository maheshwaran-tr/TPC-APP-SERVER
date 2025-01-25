import express from 'express';

import driveController from '../controllers/driveController.js';

const router = express.Router();

// Route to get all drives
router.get("/", driveController.getAllDrives);

// Route to get a drive by ID
router.get("/:id", driveController.getDriveById);

// Route to add a new drive
router.post("/", driveController.addDrive);
router.post("/all/", driveController.addMultipleDrive);

// Route to update a drive by ID
router.put("/:id", driveController.updateDrive);

// Route to delete a drive by ID
router.delete("/:id", driveController.deleteDrive);


export default router;