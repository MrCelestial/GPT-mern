import {Request, Response} from "express";
import User from "../models/user.js";
import bycrypt from "bcrypt";

export const getAllUsers = async(
    req: Request,
    res: Response,
) => {
    try {
        const users = await User.find({});
        return res.status(200).json({message: "ok",users});
    }catch (error){
        console.log(error);
        return res.status(500).json({error: error.message});
    }
};

export const signup = async (req, res) => {
    try {
        // userSignup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ error: "User already exists" });
        }
        const user = new User({ name, email, password }); // Create user with plain text password
        user.password = await bycrypt.hash(user.password, 8); // Hash the password and assign it back to the user
        await user.save();
        return res.status(201).json({ message: "Signed Up", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};