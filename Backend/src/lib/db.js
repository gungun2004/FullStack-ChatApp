import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); 
import mongoose from "mongoose";
const MONGODB_URI= process.env.MONGODB_URI;

export const connectDB = async () => {
    if (!MONGODB_URI) {
        console.error("❌ MONGODB_URI is not defined in environment variables!");
        return;
    }
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`MONGO DB CONNECTED ${conn}`);
    }
    catch(error) {
        console.log(`CONNECTION ERROR ${error}`);
    }
}
