import { Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import CourseModel from "../models/course.model";

export const CreateCourse  = CatchAsyncError(async(data:any,res:Response)=>{
    const course = await CourseModel.create(data);
    res.status(201).json({
        success:true,
        course
    });
})

//Get all courses
export const getAllcoursesService = async (res: Response) => {
    const courses = await CourseModel.find().sort({createdAt: -1});

    res.status(200).json({
        success:true,
        courses,
    });
};

export const getCoursesByLecturerId = async (res:Response, lecturerId:string) => {
    const courses = await CourseModel.find({ lecturer: lecturerId }).sort({ createdAt: -1 });

    res.status(200).json({
        success:true,
        courses,
    });
};