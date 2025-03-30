import { generateToken } from '../lib/Utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';


export const signup = async (req, res) => {
    const {fullName, email, password } = req.body;
    try { 
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
          }
            
        if(password.length < 8) {
            return res.status(400).json({message: "Password must be at least 8 characters long"});
        }

        const user = await User.findOne({email});
        
        if (user) return res.status(400).json({message: "User with this email already exists"});
        
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if(newUser){
            console.log("before token generation");
            generateToken(newUser._id, res);
            console.log("after token generation");
            console.log("before saving user to db");
            await newUser.save();
            console.log("after saving user to db");
            
            res.status(201).json({ message: "User created successfully", 
                user: {
                    _id: newUser._id,
                    email: newUser.email,
                    fullName: newUser.fullName,
                    profilePicture: newUser.profilePicture,
                    
                },
            });
        }else{
            return res.status(400).json({message: "User not created"});
        }
    
        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};
