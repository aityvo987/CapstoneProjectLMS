import { NextFunction, Request, Response } from "express";

import { CatchAsyncError } from "../middleware/catchAsyncErrors"

import ErrorHandler from "../utils/ErrorHandler";

import CourseModel from "../models/course.model";
import StudentAnswerModel from "../models/answer.model";
import NotificationModel from "../models/notification.model";
import { CheckCourseAvailability } from "./course.controller";
import { IUser } from "../models/user.model";

interface IEssayAnswer {
    questionId: string;
    answer: string;
}

interface IMultipleAnswer {
    questionId: string;
    answer: number;
}
interface IStudentAnswer {
    courseId:string;
    courseDataId:string;
    essayAnswers:IEssayAnswer[];
    multipleAnswers:IMultipleAnswer[];
}

export const addQuizzAnswer = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, courseDataId, essayAnswers, multipleAnswers }: IStudentAnswer = req.body;
        const user = req.user;
        if (!CheckCourseAvailability(user.courses, courseId)) {
            return next(new ErrorHandler("You have not paid for accessing this course", 404));
        }
        const course = await CourseModel.findById(courseId);
        
        const courseContent = course?.courseData?.find((courseDataContent: any) => courseDataContent._id.toString() === courseDataId);

        if (!courseContent) {
            return next(new ErrorHandler("Course Content not found", 400));
        }

        const newEssayAnswers = essayAnswers.map((essayAnswer) => ({
            questionId: essayAnswer.questionId,
            answer: essayAnswer.answer,
        }));

        const newMultipleAnswers = multipleAnswers.map((multipleAnswer) => ({
            questionId: multipleAnswer.questionId,
            answer: multipleAnswer.answer,
        }));

        const newAnswer = {
            user: user,
            courseId: courseId,
            courseDataId: courseDataId,
            essayAnswers: newEssayAnswers,
            multipleChoiceAnswers: newMultipleAnswers,
        };

        const studentAnswer = await StudentAnswerModel.create(newAnswer);

        await NotificationModel.create({
            user: course?.lecturer?._id,
            title: "New Submission",
            message: `You have a new submit answer in ${courseContent.title}`,
        });

        res.status(200).json({
            success: true,
            studentAnswer,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});