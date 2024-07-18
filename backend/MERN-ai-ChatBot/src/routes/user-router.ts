import {Router} from "express";
import {getAllUsers, signup} from "../handlers/user-handlers.js";
import {validationResult} from "express-validator";
import {userSignupValidator, validate} from "../libs/data-validation.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(userSignupValidator), signup);

export default userRouter;