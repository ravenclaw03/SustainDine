import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DeliveryPersonSchema = new Schema({
  email: String,
  fullName: String,
  contact: String,
  latitude:Number,
  longitude:Number,
});

export default mongoose.model("DeliveryPerson", DeliveryPersonSchema);
