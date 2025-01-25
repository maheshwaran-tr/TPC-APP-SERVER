import express from "express";
import excelController from "../controllers/excelController.js";

const router = express.Router();

router.get("/students", excelController.downloadExcel)

export default router;