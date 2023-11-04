import mongoose from "mongoose";
const Schema=mongoose.Schema;
const DeliveryPersonSchema=new Schema(
    {
        username:String,
        firstName: String,
        lastName:String,
        contact:String
    }
);

export default mongoose.model('DP',DeliveryPersonSchema);
