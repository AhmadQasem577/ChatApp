import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import connectDB from './lib/DB.js';
import cookieParser from 'cookie-parser';

// Load environment variables from .env file
dotenv.config();
// Create an express application
const app = express();

// Define the port number
const PORT = process.env.PORT ;

// Add middleware to parse JSON data
// This will allow the application to handle JSON data in the request body

app.use(express.json());// Middleware to parse JSON data from the request body
app.use(cookieParser()); // Middleware to parse cookies from the request
// This will allow the application to handle URL encoded data in the request body
app.use("/api/auth", authRoutes);
// This will start the server on the specified port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  connectDB();
});
