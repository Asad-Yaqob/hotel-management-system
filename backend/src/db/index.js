import mongoose from "mongoose";
import { DBNAME } from '../constants.js';

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DBNAME}`);
        console.log(`Connected to ${connectionInstance.connection.host} successfully.`);
    } catch (error) {
        console.log('Failed to connect to MongoDb', error);
        process.exit(1);
    }
};


export default connectDb;