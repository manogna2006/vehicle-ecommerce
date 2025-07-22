const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }] ,
   phone:    { type: String, default: "" },
  location: { type: String, default: "" },// ✅ this is correct
});

module.exports = mongoose.model("User", UserSchema);
