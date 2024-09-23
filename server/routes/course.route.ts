import express from "express";
import { uploadCourse } from "../controllers/course.contronller";

const courseRouter = express.Router();

// courseRouter.post("/create-course", isAuthenticated, authorizeRoles("admin"), uploadCourse);

export default courseRouter;