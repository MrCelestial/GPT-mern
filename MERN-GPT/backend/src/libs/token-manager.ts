import jwt from 'jsonwebtoken'
import {Request,Response,NextFunction} from "express";
import {COOKIE_NAME} from "./constants.js";

export const createToken = (id:string, email:string, expiresIn:string)=>{
    const payload = {id:id, email:email};
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
};
export const verifyToken = async (req:Request, res:Response, next:NextFunction)=>{
    const token = req.signedCookies[`${COOKIE_NAME}`];
    console.log(token);

};

