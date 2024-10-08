import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config();

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log(`Database connected`);
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/spotify`);
}

export default connectDB;