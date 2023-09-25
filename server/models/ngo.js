import mongoose from "mongoose";
const Schema=mongoose.Schema;
const NgoSchema=new Schema(
    {
        name: String,
        email:String,
        address: String,
        contact:String,
        pincode:String
    }
);

export default mongoose.model('Ngo',NgoSchema);