import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs"; //For hashing passwords
import { timeStamp } from "console";

//RegExp-REgular Expression(Biểu thức chính quy):ktra định dạng email
const emailRegexPattern: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string; //Cloudinary neeeded
        url: string;
    },
    role: string;
    isVerified: boolean;
    courses: Array<{ courseTd: string }>;
    comparePassword( password: string ):  Promise<boolean>;
};

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value: string) {
                return emailRegexPattern.test(value);
            },
            message: "Please enter a valid email address",
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    //object avatars
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    //fetch course which user has already purchase by course id==> selling course platform  
    courses: [
        {
            courseId: String,
        }
    ],
    // create 2 fields createdAt & updatedAt fields
}, { timestamps: true });

// Hash password before saving

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//compared password 
userSchema.methods.comparedPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;