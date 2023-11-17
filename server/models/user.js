import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const LocationSchema = new mongoose.Schema({
  latitude: String,
  longitude: String,
});
const UserSchema = new mongoose.Schema({
  fullName: String,
  contact: String,
  email: String,
  type: Number,
  location: [LocationSchema],
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  usernameUnique: true,
  usernameQueryFields: ["email"],
});

export default mongoose.model("User", UserSchema);
