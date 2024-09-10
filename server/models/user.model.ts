import mongoose,{Document,Model,Schema} from "mongoose";
import bcrypt from "bcryptjs"; //For hashing passwords

//RegExp-REgular Expression(Biểu thức chính quy):ktra định dạng email
const emailRegexPattern: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    avatar:{
        public_id:string; //Cloudinary neeeded
        url:string;
    },
    role:string;
    isVerified:boolean;
    courses:Array<{courseTd:string}>;
    comparePasswords:{passwords:string}=>Promise<boolean>;
}
