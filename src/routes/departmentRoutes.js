import express from "express";
import departmentController from "../controllers/departmentController.js";

const router = express.Router();

// Route to get all departments
router.get("/", departmentController.getAllDepartments);

// Route to get a department by ID
router.get("/:id", departmentController.getDepartmentById);

// Route to add a new department
router.post("/", departmentController.addDepartment);

// Route to update a department by ID
router.put("/:id", departmentController.updateDepartment);

// Route to delete a department by ID
router.delete("/:id", departmentController.deleteDepartment);

export default router;
