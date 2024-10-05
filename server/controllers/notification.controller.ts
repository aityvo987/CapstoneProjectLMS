import { Request, Response, NextFunction } from "express";
import NotificationModel from "../models/notification.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cron from "node-cron"

// Admin role

//get all notifications
export const getNotifications = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        //fetch all notifications desendently
        const notifications = await NotificationModel.find().sort({ createdAt: -1 });

        res.status(201).json({
            success: true,
            notifications,
        });


    } catch (err: any) {
        return next(new ErrorHandler(err.message, 500));
    }
});

//update notification status
export const updateNotificationStatus = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = await NotificationModel.findById(req.params.id);

        if (!notification) {
            return next(new ErrorHandler("Notification not found", 404));
        } else {
            notification.status ? (notification.status = "read") : notification?.status;
        }

        await notification.save();

        //fetch updated notification status
        const notifications = await NotificationModel.find().sort({ createdAt: -1 });

        res.status(201).json({
            success: true,
            notifications,
        });

    } catch (err: any) {
        return next(new ErrorHandler(err.message, 500));
    }
});

//delete notifications automatically - 30 days after read status's notifications

//Test cron
// cron.schedule("*/5 * * * * *", function () {
//     console.log("----------");
//     console.log('running cron...');
// })

cron.schedule("0 0 0 * * *", //0 0 0 * * * ==> midnight every days
    async () => {

        //set 30 days variable
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        //automatically delete notifications

        await NotificationModel.deleteMany({
            createdAt: { $lt: thirtyDaysAgo }, // less than 30 days
            status: "read"
        });

    });