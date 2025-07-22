const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const authenticate = require("../middleware/authMiddleware");

// POST: Add Review
router.post("/:vehicleId", authenticate, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { vehicleId } = req.params;

    const existing = await Review.findOne({
      vehicleId,
      userId: req.user.id,
    });

    if (existing) {
      return res.status(400).json({ msg: "You already reviewed this vehicle." });
    }

    const review = new Review({
      vehicleId,
      userId: req.user.id,
      username: req.user.username,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ msg: "Review added!" });
  } catch (err) {
    console.error("❌ Review error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET: All reviews for vehicle
router.get("/:vehicleId", async (req, res) => {
  try {
    const reviews = await Review.find({ vehicleId: req.params.vehicleId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching reviews" });
  }
});

module.exports = router;
