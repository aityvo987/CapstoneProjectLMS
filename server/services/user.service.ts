// get user by id
import {Response } from "express"
import userModel from "../models/user.model"
import { redis } from "../utils/redis";

export const getUserById = async (id: string, res: Response) => {
    const userJson = await redis.get(id);

    // decode Json data

    if(userJson){
        const user = JSON.parse(userJson);
        return res.status(200).json({
            success: true,
            user,
        });
    }
}

//Get all users
export const getAllUsersService = async (res: Response) => {
    const users = await userModel.find().sort({createdAt: -1});

    res.status(200).json({
        success:true,
        users,
    });
};