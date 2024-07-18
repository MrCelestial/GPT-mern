import {body, validationResult} from "express-validator";
import express from "express";

export const validate = (validations: any[])=>{
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        for(let validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length > 0) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()){
            return next();
        }
        return res.status(422).json({errors: errors.array()});
    };
};

export const userSignupValidator = [
    body("name").notEmpty(),
    body("email").notEmpty().isEmail,
    body("password").notEmpty().isLength({min: 8, max: 256}),

];
