import { Request,Response,NextFunction } from "express";
import NotificationModel from "../models/notification.model";
import {CatchAsyncError} from "../middleware/catchAsyncErrors"; 
import ErrorHandler from "../utils/ErrorHandler";

// Admin role
//get all notifications
export const getNotifications =CatchAsyncError(async (req:Request,res:Response,next:NextFunction) => {
    try{
        //fetch all notifications desendently
        const notifications = await NotificationModel.find().sort({ createdAt: -1 });

        res.status(201).json({
            success: true,
            notifications,
        });

        
    }catch(err:any){
        return next(new ErrorHandler(err.message, 500));
    }
});