import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrder } from "../models/order.model";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import { redis } from "../utils/redis";
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


//create Order

export const createOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, payment_info } = req.body as IOrder;

        if (payment_info) {
            if ("id" in payment_info) {
                const paymentIntentId = payment_info.id;
                const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

                //validate data from dummny data
                if (paymentIntent.status !== "succeeded") {
                    return next(new ErrorHandler("Payment not authorized!", 400));
                }
            }
        }

        const user = await userModel.findById(req.user?._id);

        //check user already purchase this course
        const courseExistInUser = user?.courses.some((course: any) => course._id.toString() === courseId);
        if (courseExistInUser) {
            return next(new ErrorHandler("You have already purchased this course", 400));
        }

        //check course exist
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        const data: any = {
            courseId: course._id,
            userId: user?.id,
            payment_info,
        };

        //create mailData to fetch data to the email user after success purchasing
        const mailData = {
            // user: {
            //     name: user?.name,
            // },
            //order object 
            order: {
                _id: course._id.toString().slice(0, 6), //error   _id: course._id.slice(0, 6),
                name: course.name,
                price: course.price,
                //order Date: type===> 2014 September 29
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            },
            // ORIGIN: process.env.ORIGIN,
        };

        //fetch emailData to user mail

        const html = await ejs.renderFile(
            path.join(__dirname, '../mails/order-confirmmation.ejs'),
            { order: mailData }
        );


        try {
            //if user still exists
            if (user) {
                await sendMail({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirmmation.ejs",
                    data: mailData,
                })
            }

        } catch (err: any) {
            return next(new ErrorHandler(err.message, 500));
        }

        //push new course element into user.course array
        user?.courses.push(course?._id); // fixing it document.d.ts ==> check it if bug

        await redis.set(req.user?._id, JSON.stringify(user));
        
        //update user table 
        await user?.save();

        //create notification to notify user
        await NotificationModel.create({
            userId: user?._id,
            title: "New Order",
            message: `You have new order: ${course.name}`,
        });

        //update user.purchase
        course.purchased = (course.purchased ?? 0) + 1;
        await course.save();

        //create new order
        newOrder(data, res, next);



    } catch (err: any) {
        return next(new ErrorHandler(err.message, 500));
    }
});

//get all Orders
export const getAllOrders = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            getAllOrdersService(res);
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);


// send stripe publishable key

export const sendStripePublishableKey = CatchAsyncError(async (req: Request, res: Response) => {
    res.status(200).json({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    })
});

// new payment

export const newPayment = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount: req.params.amount,
            currency: "USD",
            metadata: {
                company: "ELearning_CuongDat"
            },
            automatic_payment_method: {
                enabled: true,
            }
        });

        res.status(201).json({
            success: true,
            client_secret: myPayment.client_secret,
        });

    } catch (err: any) {
        return next(new ErrorHandler(err.message, 500));
    }
});