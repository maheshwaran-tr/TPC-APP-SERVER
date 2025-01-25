import express from "express";

import validateToken from "../middlewares/tokenValidation.js";

import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/registerAll", authController.registerAll);

router.post("/login", authController.login);

router.post("/refresh-token", authController.refreshTheToken);

export default router;