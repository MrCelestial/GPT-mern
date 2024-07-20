import {connect, disconnect} from "mongoose";
export default async function connectToMongoDB() {
    try {
      await connect(process.env.MONGODB_URL);
    }catch (error){
        console.log(error);
        throw new Error("Unable to connect to MongoDB");
    }
};

async function disconnectFromMongoDB() {
    try {
        await disconnect();
    }catch(error){
        console.log(error);
    }
        throw new Error("Disconnected from MongoDB");
}

export {connectToMongoDB, disconnectFromMongoDB};