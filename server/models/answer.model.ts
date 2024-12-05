import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";
import { ICourseData } from "./course.model";

export interface IStudentEssayAnswer extends Document {
    questionId:string;
    answer: string;
}

export interface IStudentMultipleChoiceAnswer extends Document {
    questionId:string;
    answer: number;
}

export interface IStudentAnswer extends Document {
    user: IUser;
    courseData: String;
    essayAnswers?: [IStudentEssayAnswer];
    multipleChoiceAnswers?: [IStudentMultipleChoiceAnswer];
}

const studentEssayAnswerSchema = new Schema<IStudentEssayAnswer>({
    questionId:String,
    answer: String,
});

const studentMultipleChoiceAnswerSchema = new Schema<IStudentMultipleChoiceAnswer>({
    questionId:String,
    answer: Number,
});

const studentAnswerSchema = new Schema<IStudentAnswer>({
    user: Object,
    courseData: String,
    essayAnswers: [studentEssayAnswerSchema],
    multipleChoiceAnswers: [studentMultipleChoiceAnswerSchema],
}, { timestamps: true });

const StudentAnswerModel: Model<IStudentAnswer> = mongoose.model("student_answer", studentAnswerSchema);

export default StudentAnswerModel;