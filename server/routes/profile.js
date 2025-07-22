const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

// GET /api/profile
router.get("/", async (req, res) => {
  try {
    console.log("➡️ Incoming profile request");

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    const userVehicles = await Vehicle.find({ seller: user.username });

    res.json({
      username: user.username,
      email: user.email,
      role: user.role,
      uploadedVehicles: userVehicles,
      phone: user.phone,            // ✅ Add this
  location: user.location 
    });
  } catch (err) {
    console.error("❌ Error in /profile:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
