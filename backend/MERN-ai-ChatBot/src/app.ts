import express from "express";
import {config} from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/app-router.js";
config();
const app = express();

//middlewares
app.use(express.json());

//remove later
app.use(morgan("dev"));
app.use("/api/v1/", appRouter);

export default app;