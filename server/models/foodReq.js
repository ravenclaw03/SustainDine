import mongoose from "mongoose";
const FoodRequestSchema = new mongoose.Schema({
  type: String,
  numberOfPlates: Number,
  isNGOAccepted: {
    type: Boolean,
    default: false,
  },
  isDPAccepted: {
    type: Boolean,
    default: false,
  },
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  latitude:Number,
  longitude:Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  deliveryPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("FoodReq", FoodRequestSchema);
