import express from "express";
import trainingController from "../controllers/trainingController.js";

const router = express.Router();

// Route to get all trainings
router.get("/", trainingController.getAllTrainings);

// Route to get a training by ID
router.get("/:id", trainingController.getTrainingById);

// Route to add a new training
router.post("/", trainingController.addTraining);
router.post("/attandance", trainingController.updateAttandances);

// Route to update a training
router.put("/:id", trainingController.updateTraining);

// Route to delete a training
router.delete("/:id", trainingController.deleteTraining);

export default router;