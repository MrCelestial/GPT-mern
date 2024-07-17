import {connect} from "mongoose"
export const connectToMongoDB = async () => {
    try {
      await connect(process.env.MONGODB_URL);
    }catch (error){
        console.log(error);
        throw new Error("Unable to connect to MongoDB");
    }
};
