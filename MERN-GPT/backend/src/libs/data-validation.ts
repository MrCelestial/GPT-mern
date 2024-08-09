import {body, ValidationChain, validationResult} from "express-validator";
import   {NextFunction, Response, Request} from "express";

export const validate = (validations: ValidationChain[])=>{
    return async (req: Request, res: Response, next: NextFunction) => {
        for(let validation of validations) {
            const result = await validation.run(req);
            if(!result.isEmpty()){
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
export const userLoginValidator = [
    body("email").trim().notEmpty().isEmail().withMessage("Email is required"),
    body("password").trim().notEmpty().isLength({min: 8, max: 256}).withMessage("Password must be at least 8 characters long"),

];

export const userSignupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...userLoginValidator,
];

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is needed"),
];
