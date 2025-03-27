import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLingth: 8,
            maxLingth: 30,
        },
        name: {
            type: String,
            required: true,
        },
        profilePicture: {   
            type: String,
            default: "",
            required: false,
        },
        

    },{
        timestamps: true,
    }
);
const user = mongoose.model("User", userSchema);

export default user;