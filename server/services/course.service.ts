import { Response } from "express";

import CourseModel from "../models/course_model";

export const CreateCourse  = CatchAsyncError(async(data:any,res:Response)=>{
    const course = await CourseModel.create(data);
    res.status(201).json({
        success:true,
        course
    });
})