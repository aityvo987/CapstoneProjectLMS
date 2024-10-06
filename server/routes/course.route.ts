import express from "express";
import {
    deleteCourse,
    editCourse,
    getAllCourse,
    getCourseContent,
    getSingleCourse,
    uploadCourse
} from "../controllers/course.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";

const courseRouter = express.Router();

courseRouter.post("/create-course", isAutheticated, authorizeRoles("admin"), uploadCourse);

courseRouter.put("/edit-course/:id", isAutheticated, authorizeRoles("admin"), editCourse);

courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-courses/", getAllCourse);

courseRouter.get("/get-course-content/:id", isAutheticated, getCourseContent);

courseRouter.get("/get-courses", isAutheticated, authorizeRoles("admin"), getAllCourse);

courseRouter.delete('/delete-course/:id', isAutheticated, authorizeRoles("admin"), deleteCourse);



export default courseRouter;