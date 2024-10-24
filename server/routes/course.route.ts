import express from "express";
import { addAnswer, addQuestion, addReview, addReviewReply, editCourse, getAdminAllCourses, getAllCourse, getCourseContent, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { deleteCourse } from "../controllers/course.controller";
import { updateAccessToken } from "../controllers/user.controller";

const courseRouter = express.Router();

courseRouter.post("/create-course", isAutheticated, authorizeRoles("admin"), uploadCourse);

courseRouter.put("/edit-course/:id", isAutheticated, authorizeRoles("admin"), editCourse);

courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-courses/", getAllCourse);

courseRouter.get("/get-course-content/:id",isAutheticated,getCourseContent);

courseRouter.put("/add-question",isAutheticated,addQuestion);

courseRouter.put("/add-answer",isAutheticated,addAnswer);

courseRouter.put("/add-review/:id",isAutheticated,addReview);

courseRouter.put("/add-review-reply/:id",isAutheticated,authorizeRoles("admin"),addReviewReply);
courseRouter.get("/get-course-content/:id", isAutheticated, getCourseContent);

courseRouter.get("/get-admin-courses", isAutheticated, authorizeRoles("admin"), getAdminAllCourses);

courseRouter.delete('/delete-course/:id', isAutheticated, authorizeRoles("admin"), deleteCourse);



export default courseRouter;