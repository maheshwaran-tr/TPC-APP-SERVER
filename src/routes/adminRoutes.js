import express from "express";

import adminController from "../controllers/adminController.js";

const router = express.Router();

router.get("/", adminController.getAllAdmins);
router.get("/:id", adminController.getAdminById);
router.get("/byUser/:id", adminController.getAdminByUserId);

router.post("/", adminController.createAdmin);
router.put("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

export default router;