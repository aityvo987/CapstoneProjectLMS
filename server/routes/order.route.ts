import express from "express";
import {
    createOrder,
    getAllOrders
} from "../controllers/order.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controller";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAutheticated, createOrder);

orderRouter.get("/get-orders", isAutheticated, authorizeRoles("admin"), getAllOrders);


export default orderRouter;
