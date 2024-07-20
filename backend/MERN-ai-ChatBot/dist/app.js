import express from "express";
import { config } from "dotenv";
import connectToMongoDB from "./connections/mongoDB.js";
config();
const app = express();
const PORT = process.env.PORT || 3000;
connectToMongoDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${process.env.PORT} and is connected to MongoDB`));
}).catch((err) => console.error(err));
app.use(express.json());
export default app;
//# sourceMappingURL=app.js.map