// models/Vehicle.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: String, // user email
  username: String, // for display
  rating: Number,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const vehicleSchema = new mongoose.Schema({
  title: String,
  type: String,
  description: String,
  price: Number,
  seller: String,
  image: String,
  images: [String],
  reviews: [reviewSchema], 
  phoneNumber: {
  type: String,
  required: true
},
location: {
  type: String,
  required: true
},

// 👈 Add this
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
