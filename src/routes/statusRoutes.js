import express from "express";
import statusController from "../controllers/statusController.js";

const router = express.Router();

// Route to get all statuses
router.get("/", statusController.getAllStatuses);

// Route to get a status by ID
router.get("/:id", statusController.getStatusById);

// Route to add a new status
router.post("/", statusController.addStatus);

// Route to update a status by ID
router.put("/:id", statusController.updateStatus);

// Route to delete a status by ID
router.delete("/:id", statusController.deleteStatus);


export default router;