import express from "express";
import {config} from "dotenv";
import connectToMongoDB from "./connections/mongoDB.js";
import morgan from "morgan";
import appRouter from "./routes/app-router.js";
config();
const app = express();

const PORT = process.env.PORT || 3000;

connectToMongoDB().then(()=>{
        app.listen(PORT, ()=>
            console.log(`Server running on port: ${process.env.PORT} and is connected to MongoDB`)
        );

    }).catch((err)=> console.error(err));

//middlewares
app.use(express.json());

//remove later
app.use(morgan("dev"));
app.use("/api/v1/", appRouter);

export default app;