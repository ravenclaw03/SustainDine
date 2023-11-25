import mongoose from "mongoose";

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
  latitude:Number,
  longitude:Number,
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
});

export default mongoose.model("FoodReq", FoodRequestSchema);
