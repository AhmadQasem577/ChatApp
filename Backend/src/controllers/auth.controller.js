import { generateToken } from '../lib/Utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';


/* it is async function that handles the signup process we gave it res and req as parameters because we are using express
    becouse we will use it in the route request and response object.
*/

export const signup = async (req, res) => {
    //here we are destructuring the body of the request to get the fullName, email and password from the request body.
    const {fullName, email, password } = req.body;
    // try catch block is used to handle errors that may occur during the execution of the code inside the try block.
    try { 
        // here we are checking if the fullName, email and password are provided in the request body.
        // if any of them is not provided we are sending a response with status code 400 and a message saying that all fields are required.
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
          }
           // here we are checking if the password is at least 8 characters long. 
        if(password.length < 8) {
            return res.status(400).json({message: "Password must be at least 8 characters long"});
        }
        // here the we are  using the User model to find a user with the same email in the database.
        // if a user is found we are sending a response with status code 400 and a message saying that a user with this email already exists.
        const user = await User.findOne({email});
        
        if (user) return res.status(400).json({message: "User with this email already exists"});
        
        // here we made salt and hashed the password using bcryptjs library.
        // bcrypt is a library that is used to hash passwords and salt is a random string that is added to the password before hashing it.
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        // here we are creating a new user object using the User model and passing the fullName, email and hashed password to it.
        // the User model is a Mongoose model that is used to interact with the users collection in the database.
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });
        // here we are checking if the newUser object is created successfully.
        // if it is created successfully we are generating a token for the user using the generateToken function and passing the user id and response object to it.

        if(newUser){
            // here we are generating a token for the user using the generateToken function and passing the user id and response object to it.
            // the generateToken function is a utility function that is used to generate a JWT token for the user.
            generateToken(newUser._id, res);
            
            // here we are saving the new user object to the database using the save method.
            await newUser.save();
            // here we are sending a response with status code 201 and a message saying that the user is created successfully.
            

            res.status(201).json({ message: "User created successfully", 
                user: {
                    
                    email: newUser.email,
                    fullName: newUser.fullName,
                    profilePicture: newUser.profilePicture, 
                    
                },
            });
        }else{
            // here we are sending a response with status code 400 and a message saying that the user is not created.
            // this means that the user object is not created successfully.
            return res.status(400).json({message: "User not created"});
        }
    
        
    } catch (error) {
        // here we are catching any errors that may occur during the execution of the code inside the try block.
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});

        //we dont tell the user if the email or password is wrong for security reasons.
        if(!user) return res.status(400).json({message: "Invalid credentials"});
        
        if(!email || !password) return res.status(400).json({message: "All fields are required"});

        const isPasswordCorrect =await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        generateToken(user._id, res);
        res.status(200).json({ message: "User logged in successfully", 
            user: {
                email: user.email,
                fullName: user.fullName,
                profilePicture: user.profilePicture, 
            },
        });

        

    }catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

};
export const logout = async (req, res) => {
    try {
        // Clear the token cookie to log out the user
        res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
        
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {
try {
        const {profilePicture, fullName} = req.body;
        const userID=req.user._id ;
        
        if(!profilePicture || !fullName) return res.status(400).json({message: "All fields are required"});
        const UploadResponse=await cloudinary.uploader.upload(profilePicture);
        const updatedUser= User.findByIdAndUpdate(userID, {
            profilePicture: UploadResponse.secure_url,
            fullName,
        },{new:true});

        res.status(200).json({message: "User updated successfully", user: {
          
            fullName: updatedUser.fullName,
            profilePicture: updatedUser.profilePicture, 
        }});

} catch (error) {
    
    console.log("Error in updateProfile controller", error.message);
    res.status(500).json({ message: "Internal server error" });
}
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json({
            message: "User is authenticated",
            user: {
                email: req.user.email,
                fullName: req.user.fullName,
                profilePicture: req.user.profilePicture, 
            },
        });
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

};
