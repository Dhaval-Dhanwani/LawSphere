
import mongo from 'mongoose';
import process from 'process';

async function makeconnection() {
    try {
        await mongo.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lawsphere");
        console.log("MongoDB database connected successfully");
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
        throw error;
    }
}

export default makeconnection;