import { Router } from 'express';
import userRouter from "./user-router.js"
import chatRoutes from "./chat-router.js";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/chat", chatRoutes);
export default appRouter;
