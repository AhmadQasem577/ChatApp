import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        // Check if the token exists in the request cookies
        if(!token) return res.status(401).json({message: "Unauthorized"});

        // Verify the token using the secret key from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({message: "Unauthorized"});

        // Find the user associated with the token in the database
        const user = await User.findById(decoded.userID).select("-password -__v");
        if(!user) return res.status(401).json({message: "Unauthorized"});

        req.user = user; // Attach the user object to the request for further use in the route handlers
        next(); // Call the next middleware or route handler

        


    }catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

}