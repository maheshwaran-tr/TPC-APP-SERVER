import emailController from "../controllers/emailController.js";
import express from "express";

const router = express.Router()

router.post('/send/all', emailController.emailAllStudents);
router.post('/send/att', emailController.emailAttandance);

export default router;