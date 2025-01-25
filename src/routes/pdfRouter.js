import express from "express";
import pdfController from "../controllers/pdfController.js";

const router = express.Router();

router.get("/", pdfController.genPdf);

export default router;