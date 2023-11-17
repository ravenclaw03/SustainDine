import mongoose from "mongoose";
const Schema = mongoose.Schema;
const LocationSchema = new Schema({
  latitude: String,
  longitude: String,
});
const DeliveryPersonSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  contact: String,
  location: [LocationSchema],
});

export default mongoose.model("DeliveryPerson", DeliveryPersonSchema);
