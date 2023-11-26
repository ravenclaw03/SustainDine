import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DeliveryPersonSchema = new Schema({
  email: String,
  fullName: String,
  contact: String,
  latitude:Number,
  longitude:Number,
  type: Number,
  address: String,
});

export default mongoose.model("DeliveryPerson", DeliveryPersonSchema);
