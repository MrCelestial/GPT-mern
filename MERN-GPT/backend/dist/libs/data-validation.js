import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const userLoginValidator = [
    body("email").trim().notEmpty().isEmail().withMessage("Email is required"),
    body("password").trim().notEmpty().isLength({ min: 8, max: 256 }).withMessage("Password must be at least 8 characters long"),
];
export const userSignupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...userLoginValidator,
];
//# sourceMappingURL=data-validation.js.map