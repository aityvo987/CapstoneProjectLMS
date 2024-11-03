import express from "express";
import {
    createOrder,
    getAllOrders,
    newPayment,
    sendStripePublishableKey
} from "../controllers/order.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controller";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAutheticated, createOrder);

orderRouter.get("/get-orders", isAutheticated, authorizeRoles("admin"), getAllOrders);

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

orderRouter.post("/payment", isAutheticated, newPayment);


export default orderRouter;
