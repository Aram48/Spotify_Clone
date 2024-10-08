import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mogodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';
dotenv.config();

// app config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// initializing routes
app.use('/api/song', songRouter);
app.use('/api/album', albumRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});