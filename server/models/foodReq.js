import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  latitude: String,
  longitude: String,
});
const FoodRequestSchema = new mongoose.Schema({
  type: String,
  numberOfPlates: Number,
  isAccepted: {
    type: Boolean,
    default: false,
  },
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  location: [LocationSchema],
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
});

export default mongoose.model("FoodReq", FoodRequestSchema);
