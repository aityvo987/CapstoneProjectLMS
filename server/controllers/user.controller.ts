require('dotenv').config();
import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import userModel from "../models/user.model";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";
import { getUserById } from "../services/user.service";

import cloudinary from "cloudinary"

//register user
interface IRegistrationBody {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

export const registrationUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandler("Email already exists", 400));
        }

        const user: IRegistrationBody = {
            name,
            email,
            password,
        };

        //Create activation code and send to user email
        const activationToken = createActivationToken(user);

        const activationCode = activationToken.activationCode;

        const data = { user: { name: user.name }, activationCode };
        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data);

        try {
            console.log(`User is connecting: ${user.email}`);
            await sendMail({
                email: user.email,
                subject: "Activate your account",
                template: "activation-mail.ejs",
                data,
            });

            res.status(200).json({
                success: true,
                message: `Registration successful. Please check your email: ${user.email} to activate your account.`,
                activationToken: activationToken.token,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

interface IActivationToken {
    token: string;
    activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign({
        user,
        activationCode
    },
        process.env.ACTIVATION_SECRET as Secret,
        {
            expiresIn: "5m",
        });

    return { token, activationCode };
};

// activate user
interface IActivationRequest {
    activation_token: string;
    activation_code: string;
}

export const activateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { activation_token, activation_code } = req.body as IActivationRequest;

        //new User variable
        const newUser: { user: IUser; activationCode: string } = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET as string,
        ) as { user: IUser; activationCode: string };

        //wrong activation code 
        if (newUser.activationCode !== activation_code) {
            return next(new ErrorHandler("Invalid activation code", 400));
        }

        const { name, email, password } = newUser.user;

        //Check existed user
        const existUser = await userModel.findOne({ email });

        if (existUser) {
            return next(new ErrorHandler("Email already exists", 400));
        }

        const user = await userModel.create({
            name,
            email,
            password,
        });

        res.status(201).json({
            success: true,
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// Login user
interface ILoginRequest {
    email: string;
    password: string;
}

export const loginUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as ILoginRequest;

        //check empty fields
        if (!email || !password) {
            return next(new ErrorHandler("Please provide email and password", 400));
        };

        //check user is existed or invalid username
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 400));
        };

        //check password is invalid or NOT
        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return next(new ErrorHandler("Invalid email or password", 400));
        };

        sendToken(user, 200, res);

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// Logout user

export const logoutUser = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            //unset cookie when logout
            res.cookie("access_token", "", { maxAge: 1 });
            res.cookie("refresh_token", "", { maxAge: 1 });

            //delete user.id from redis after logout
            const userId = req.user?._id || '';
            redis.del(userId);

            res.status(200).json({
                success: true,
                message: "Logged out successfully"
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// upate access token
export const updateAccessToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        //get refresh token from cookie
        const refresh_token = req.cookies?.refresh_token as string;

        if (!refresh_token) {
            return next(new ErrorHandler('Refresh token not provided', 400));
        }
        //check refresh_token from redis
        const decoded = jwt.verify(refresh_token,
            process.env.REFRESH_TOKEN as string) as JwtPayload;

        const message = 'Could not refresh token';

        if (!decoded) {
            return next(new ErrorHandler(message, 400));
        }

        const session = await redis.get(decoded.id as string);

        if (!session) {
            return next(new ErrorHandler("Please login to access this resources", 400));
        }

        const user = JSON.parse(session);


        const accessToken = jwt.sign(
            {
                id: user._id
            },
            process.env.ACCESS_TOKEN as string,
            {
                expiresIn: "5m",
            }
        );

        const refreshToken = jwt.sign(
            {
                id: user._id
            },
            process.env.REFRESH_TOKEN as string,
            {
                expiresIn: "3d",
            }
        );

        //set request user each time reload token
        req.user = user;

        //update access token var cookie
        res.cookie("access_token", accessToken, accessTokenOptions);
        res.cookie("refresh_token", refreshToken, refreshTokenOptions);

        await redis.set(user._id,JSON.stringify(user),'EX',604800);// expired after 7 days

        res.status(200).json({
            status: 'access',
            accessToken,
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// get user info
export const getUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id;
        getUserById(userId, res);

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});


interface ISocialAuthBody {
    email: string;
    name: string;
    avatar: string;
}

// registration using social auth

export const socialAuth = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, avatar } = req.body as ISocialAuthBody;
        const user = await userModel.findOne({ email });
        if (!user) {
            const newUser = await userModel.create({ email, name, avatar });
            sendToken(newUser, 200, res);
        }
        else {
            sendToken(user, 200, res);
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// update user info
interface IUpdateUserInfo {
    name?: string;
    email?: string;
}

export const upateUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email } = req.body as IUpdateUserInfo;
        const userId = req.user?._id;
        const user = await userModel.findById(userId);

        //check entered email is exist
        if (email && user) {
            const isEmailExist = await userModel.findOne({ email });
            if (isEmailExist) {
                return next(new ErrorHandler("Email already exists", 400));
            }
            user.email = email;
        }

        //check entered email is exist
        if (name && user) {
            user.name = name;
        }

        await user?.save();

        // update data in redis
        await redis.set(userId, JSON.stringify(user));

        res.status(200).json({
            success: true,
            user,
        });


    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});


//Update user password

interface IUpdatePassword {
    oldPassword: string;
    newPassword: string;
}

export const updatePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { oldPassword, newPassword } = req.body as IUpdatePassword;

        const userId = req.user?._id;
        const user = await userModel.findById(userId).select("+password");
        //Check empty input fields
        if (!oldPassword || !newPassword) {
            return next(new ErrorHandler("Empty fields", 400));
        }

        //Check user var exists
        if (user?.password === undefined) {
            return next(new ErrorHandler("Invalid user", 400));
        }

        //Check invalid old password
        const isPasswordMatch = await user?.comparePassword(oldPassword);
        if (!isPasswordMatch) {
            return next(new ErrorHandler("Incorrect old password", 400));
        }

        const isSamePassword = await user?.comparePassword(newPassword);
        if (isSamePassword) {
            return next(new ErrorHandler("New password is same with the old password. Please enter new password.", 400));
        }

        user.password = newPassword;

        await user?.save();

        //update data from redis
        await redis.set(req.user?._id, JSON.stringify(user));

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

//update profile avatar or user picture
//avatar need to base64 picture since cloudinary support this type of image
//https://elmah.io/tools/base64-image-encoder/==> Using this website to convert image link to base64

interface IUpdateAvatar {
    avatar: string;
}

export const updateAvatar = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { avatar } = req.body as IUpdateAvatar;
        const userId = req.user?._id;
        const user = await userModel.findById(userId);

        if (avatar && user) {
            //destroy old avatar from cloudinary
            if (user?.avatar?.public_id) {
                await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

                //update avatar to cloudinary
                const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                    folder: "avatars", //save in avatar folder
                    width: 150,
                });

                //set avatar atributes
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };

            } else {
                const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150,
                });

                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
        }

        await user?.save();

        //update data from redis
        await redis.set(userId, JSON.stringify(user));

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});