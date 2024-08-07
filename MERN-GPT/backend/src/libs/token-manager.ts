import jwt from 'jsonwebtoken'
import {Request,Response,NextFunction} from "express";
import {COOKIE_NAME} from "./constants.js";

export const createToken = (id:string, email:string, expiresIn:string)=>{
    const payload = {id:id, email:email};
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
};
export const verifyToken = async (req:Request, res:Response, next:NextFunction)=> {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if(!token || token.trim()==""){
        return res.status(401).json({message:"No token provided"});
    }
    return new Promise<void>((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
                return res.status(401).json({error: "Unauthorized"});
            }else{
                console.log("Token verification successful");
                resolve();
                res.locals.jwtData = decoded;
                return next();
            }
        });
    });
};
