import { Router } from 'express';
import {verifyToken} from "../libs/token-manager.js";
const chatRouter = Router();

chatRouter.post("/new", verifyToken)

export default chatRouter;

