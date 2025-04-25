// import libraries
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/DB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Import routes
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';


// initialize environment variables and express app
dotenv.config();
const app = express();

// Define the port number
const PORT = process.env.PORT ;


//middleware initialization
app.use(express.json());// Middleware to parse JSON data from the request body
app.use(cookieParser()); // Middleware to parse cookies from the request
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // Middleware to enable CORS for the specified client URL

//intilize routes 
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// start the server on the port 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);// if this line is executed, it means the server is running successfully
  connectDB();// it should console.log(`MongoDB connected: ${connection.connection.host}`) if the connection is successful
});
