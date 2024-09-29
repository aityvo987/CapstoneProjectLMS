import express from "express";
import { getNotifications } from "../controllers/notification.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";

const notificationRouter = express.Router();

notificationRouter.get("/get-all-notifications",isAutheticated, authorizeRoles("admin"),getNotifications);
export default notificationRouter;