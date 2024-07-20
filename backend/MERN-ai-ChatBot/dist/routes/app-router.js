import { Router } from 'express';
import userRouter from "./user-router.js";
import chatRoutes from "./chat- routes.js";
const appRouter = Router();
appRouter.use("/user", userRouter);
appRouter.use("/users", chatRoutes);
export default appRouter;
//# sourceMappingURL=app-router.js.map