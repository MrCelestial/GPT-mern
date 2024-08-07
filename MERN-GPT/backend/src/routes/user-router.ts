import { Router } from "express";
import { getAllUsers, login, signup } from "../handlers/user-handlers.js";
import { userLoginValidator, userSignupValidator, validate } from "../libs/data-validation.js";
import {verifyToken} from "../libs/token-manager.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(userSignupValidator), signup);
userRouter.post("/login", validate(userLoginValidator), login);
userRouter.post("/auth-status", verifyToken, login);
export default userRouter;
