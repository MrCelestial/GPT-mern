import app from "./app.js";
import connectToMongoDB from "./connections/mongoDB.js";
const PORT = process.env.PORT || 3000;
connectToMongoDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${process.env.PORT} and is connected to MongoDB`));
}).catch((err) => console.error(err));
//# sourceMappingURL=index.js.map