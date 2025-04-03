import {v2 as cloudinary} from 'cloudinary';
import {config} from 'dotenv';

config(); // Load environment variables from .env file

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// Export the configured cloudinary instance for use in other parts of the application  
export default cloudinary; // Export the configured cloudinary instance for use in other parts of the application
// This allows you to use cloudinary methods for uploading, deleting, and managing media files in your application