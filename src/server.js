import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import driverRoutes from "./routes/driveRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";
import excelRoutes from "./routes/excelRoutes.js";
import pdfRoutes from "./routes/pdfRouter.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/student", studentRoutes);
app.use("/staff", staffRoutes);
app.use("/admin", adminRoutes);
app.use("/company", companyRoutes);
app.use("/drive", driverRoutes);
app.use("/file", fileRoutes);
app.use("/dept", departmentRoutes);
app.use("/application", applicationRoutes);
app.use("/status", statusRoutes);
app.use("/excel", excelRoutes);
app.use("/pdf",pdfRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Hello, Express.js!");
});

// Handle unmatched routes (404)
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});


// Middleware to handle errors
app.use(errorHandler);

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
