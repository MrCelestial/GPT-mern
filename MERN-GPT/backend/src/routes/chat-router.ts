import { Router } from 'express';
import {verifyToken} from "../libs/token-manager.js";
import {chatCompletionValidator, validate} from "../libs/data-validation.js";
import {generateChatCompletion} from "../handlers/chat-handlers.js";
const chatRouter = Router();

chatRouter.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);


export default chatRouter;

