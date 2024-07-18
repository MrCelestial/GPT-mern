import { config } from "dotenv";
import express  from "express";
import {connectToMongoDB} from "./connections/mongoDB.js";
import userRouter from "./routes/user-router.js";

config();

process.on('uncaughtException', function (err) {
    console.log(err);
});


const app = express();

app.use("/user", userRouter);
app.use("/chats");

connectToMongoDB()
    .then(()=>{
    app.listen(process.env.PORT, ()=>
        console.log(`Server running on port: ${process.env.PORT} and is connected to MongoDB`)
    );

}).catch((err)=> console.error(err));

