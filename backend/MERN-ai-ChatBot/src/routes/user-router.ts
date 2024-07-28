import { Router } from "express";
import { getAllUsers, login, signup } from "../handlers/user-handlers.js";
import { userLoginValidator, userSignupValidator, validate } from "../libs/data-validation.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(userSignupValidator), signup);
userRouter.post("/login", validate(userLoginValidator), login);
export default userRouter;
