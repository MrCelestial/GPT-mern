import {Router} from "express";
import {getAllUsers} from "../handlers/user-handlers.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup");

export default userRouter;