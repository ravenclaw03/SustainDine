import mongoose from "mongoose";
const Schema = mongoose.Schema;
const LocationSchema = new Schema({
  latitude: String,
  longitude: String,
});
const NgoSchema = new Schema({
  name: String,
  email: String,
  address: String,
  contact: String,
  pincode: String,
  location: [LocationSchema],
});

export default mongoose.model("Ngo", NgoSchema);
