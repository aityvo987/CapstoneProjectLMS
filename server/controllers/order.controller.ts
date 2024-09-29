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
import { newOrder } from "../services/order.service";


//create Order

export const createOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, payment_info } = req.body as IOrder;

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
            userId: user?.id
        };

        newOrder(data, res, next);

        //create mailData to fetch data to the email user after success purchasing
        const mailData = {
            //order object 
            order: {
                _id: course._id.slice(0, 6), //error   _id: course._id.slice(0, 6),
                name: course.name,
                price: course.price,
                //order Date: type===> 2014 September 29
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            }
        }

        //fetch emailData to user mail

        const html = await ejs.renderFile(path.join(__dirname, '../mails/order-confirmmation.ejs'), { order: mailData });


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

        //update user table 
        await user?.save();

        //create notification to notify user
        await NotificationModel.create({
            userId: user?._id,
            title: "New Order",
            message: `You have new order: ${course.name}`,
        });

        res.status(201).json({
            success: true,
            order:course,
        });


    } catch (err: any) {
        return next(new ErrorHandler(err.message, 500));
    }
});
