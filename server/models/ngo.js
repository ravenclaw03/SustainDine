import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NgoSchema = new Schema({
  fullName: String,
  contact: String,
  email: String,
  type: Number,
  latitude: Number,
  longitude: Number,
  address: String,
});

export default mongoose.model("Ngo", NgoSchema);
