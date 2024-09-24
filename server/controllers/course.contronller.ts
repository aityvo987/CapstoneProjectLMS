import { NextFunction, Request, Response } from "express";

import{CatchAsyncError} from "../middleware/catchAsyncErrors"

import ErrorHandler from "../utils/ErrorHandler";

import { Redis } from "ioredis";

import cloudinary from "cloudinary";
import { CreateCourse } from "../services/course.service";
import CourseModel from "../models/course.model";
import redis from "../utils/redis";

export const uploadCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail){
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail,{
                folder:"courses"
            });
            data.thumbnail = {
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        }
        CreateCourse(data,res,next);

    }catch(error:any){
        return next(new ErrorHandler(error.message,500));
    }
});

export const editCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const data = req.body;
        const thumbnail = data.thumbnail;
        const courseId = req.params.id;
        if (thumbnail){
            await cloudinary.v2.uploader.destroy(thumbnail.public_id)
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail,{
                folder:"courses"
            });
            data.thumbnail = {
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        }
        const course = await CourseModel.findByIdAndUpdate(courseId,{
            $set:data},{new:true});
        res.status(201).json({
            success:true,
            course,
        });

    }catch(error:any){
        return next(new ErrorHandler(error.message,500));
    }
});

export const getSingleCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction)=>{
    try{

        const courseId = req.params.id;
        const isCacheExists = await redis.get(courseId);

        
        
        if(isCacheExists){
            const course = JSON.parse(isCacheExists)
            res.status(200).json({
                success:true,
                course,
            });
        }
        else{
            const course = await CourseModel.findById(req.params.id).select(
                "-courseData.videoUrl -courseData.suggestion - courseData.question -courseData.links"
            );
            await redis.set(courseId,JSON.stringify(course))
            res.status(200).json({
                success:true,
                course,
            });
        }
        

    }catch(error:any){
        return next(new ErrorHandler(error.message,500));
    }
});

export const getAllCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction)=>{
    try{

        const isCacheExists = await redis.get("allCourses");
        if (isCacheExists){
            const course = JSON.parse(isCacheExists)
            res.status(200).json({
                success:true,
                course,
            });
        } else{
            const courses = await CourseModel.find().select(
                "-courseData.videoUrl -courseData.suggestion - courseData.question -courseData.links"
            );

            await redis.set("allCourses",JSON.stringify(courses));

            res.status(200).json({
                success:true,
                courses,
            });
        }
        

    }catch(error:any){
        return next(new ErrorHandler(error.message,500));
    }
});

