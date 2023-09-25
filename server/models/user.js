import mongoose from "mongoose";

const UserSchema=new mongoose.Schema(
    {
        username:String,
        firstName: String,
        lastName:String,
        address: String,
        contact:String
    }
);
export default mongoose.model("User",UserSchema);
