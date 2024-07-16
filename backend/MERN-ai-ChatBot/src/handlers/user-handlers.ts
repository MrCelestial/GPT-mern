import {Request,Response,NextFunction} from "express";
import User from "../models/user.js";

export const getAllUsers = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    }catch (error){
        console.log(error);
        return res.status(500).json({error: error.message});
    }
};