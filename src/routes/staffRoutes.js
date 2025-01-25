import express from "express";

import staffController from "../controllers/staffController.js";

const router = express.Router();

router.get("/", staffController.getAllStaffs);
router.get("/:id", staffController.getByStaffId);
router.get("/byUser/:id", staffController.getStaffByUserId);

router.post("/", staffController.createStaff);

router.put("/:id", staffController.updateByStaffId);

router.delete("/:id", staffController.deleteByStaffId);

export default router;