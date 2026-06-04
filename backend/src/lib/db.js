import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected. Mongoose will try to reconnect.");
});

mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected");
});

const connectDB = async () => {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        throw new Error("MONGO_URI is missing in backend/.env");
    }

    const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
