import {Router} from "express";
import {getAllUsers} from "../handlers/user-handlers.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

export default userRouter;