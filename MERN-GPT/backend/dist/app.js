import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/app-router.js";
import cookieParser from "cookie-parser";
config();
const app = express();
//middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
//remove later
app.use(morgan("dev"));
app.use("/api/v1/", appRouter);
export default app;
//# sourceMappingURL=app.js.map