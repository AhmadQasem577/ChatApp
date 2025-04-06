import User from '../models/message.model.js';
import Message from '../models/message.model.js';
import { v2 as cloudinary } from 'cloudinary';
export const getUsersFromSidebar=async (req, res) => {
    try {
        const logedUser = req.user._id; // Assuming req.user is populated by the middleware
        const filteredUsers = await User.find({ _id: { $ne: logedUser } }).select('-password -__v');
        if (!filteredUsers) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(filteredUsers);
        
    } catch (error) {
        console.log("Error in message controller", error.message);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
export const getMessages=async (req, res) => { 
   try {
        const {id:contactUserId} = req.params; // Extract the ID from the request parameters
        const userID = req.user._id; // Assuming req.user is populated by the middleware

        const messages = await Message.find({
            $or: [
                { sender: userID, receiver: contactUserId },
                { sender: contactUserId, receiver: userID }
            ]
        })

        res.status(200).json(messages); // Send the messages as a response
   } catch (error) {
        console.log("Error in message controller", error.message);
        res.status(500).json({ message: "Internal server error" });
   }
    
}

export const sendMessage=async (req, res) => {
    try {
        const{text,image}=req.body;
        const {id:receiverID} = req.params; 
        const senderID = req.user._id; // Assuming req.user is populated by the middleware
        let imageURL = null;
        if(image){

            const uploadedImage = await cloudinary.uploader.upload(imgage);
            imgageUrl = uploadedImage.secure_url; 
        }
        const newMessage = await Message.create({
            sender: senderID,
            receiver: receiverID,
            text,
            image: imageURL 
        });
        await newMessage.save(); 

        //////////////////////////////////////////////////////////////////////////////////
        //todo: real time functionality goes here

        res.status(201).json(newMessage); // Send the newly created message as a response

    } catch (error) {
        console.log("Error in message controller", error.message);
        res.status(500).json({ message: "Internal server error" });

    }
}