import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


const UserSchema = new mongoose.Schema({
  fullName: String,
  contact: String,
  email: String,
  type: Number,
  latitude:Number,
  longitude:Number
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  usernameUnique: true,
  usernameQueryFields: ["email"],
});

export default mongoose.model("User", UserSchema);
