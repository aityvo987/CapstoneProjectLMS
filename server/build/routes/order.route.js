"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const auth_1 = require("../middleware/auth");
const orderRouter = express_1.default.Router();
orderRouter.post("/create-order", auth_1.isAutheticated, order_controller_1.createOrder);
orderRouter.post("/create-cart-order", auth_1.isAutheticated, order_controller_1.createCartOrder);
orderRouter.get("/get-orders", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), order_controller_1.getAllOrders);
orderRouter.get("/payment/stripepublishablekey", order_controller_1.sendStripePublishableKey);
orderRouter.post("/payment", auth_1.isAutheticated, order_controller_1.newPayment);
orderRouter.post("/add-cart", order_controller_1.addToCartGuest);
orderRouter.delete("/delete-cart/:id", order_controller_1.deleteCartItemGuest);
orderRouter.get("/get-cart", order_controller_1.fetchCartGuest);
orderRouter.post("/add-user-cart", auth_1.isAutheticated, order_controller_1.addToCartUser);
orderRouter.delete("/delete-user-cart/:id", auth_1.isAutheticated, order_controller_1.deleteCartItemUser);
orderRouter.delete("/clear-user-cart/", auth_1.isAutheticated, order_controller_1.clearCartItemsUser);
orderRouter.get("/get-user-cart", auth_1.isAutheticated, order_controller_1.fetchCartUser);
exports.default = orderRouter;