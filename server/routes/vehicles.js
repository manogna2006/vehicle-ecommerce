const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");
const multer = require("multer");
const path = require("path");
const authenticate = require("../middleware/authMiddleware");

// ⚙️ Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

/* --------------------------------------------
   ✅ ADD VEHICLE
--------------------------------------------- */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, type, description, price, seller,phoneNumber,location } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    const newVehicle = new Vehicle({
      title,
      type,
      description,
      price,
      seller,
      phoneNumber,
      location,
      image: imagePath,
    });

    await newVehicle.save();
    res.status(201).json({ msg: "Vehicle added successfully!" });
  } catch (err) {
    console.error("❌ Error adding vehicle:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* --------------------------------------------
   ✅ GET ALL VEHICLES
--------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* --------------------------------------------
   ✅ GET SINGLE VEHICLE BY ID
--------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ msg: "Vehicle not found" });
    res.json(vehicle);
  } catch (err) {
    console.error("❌ Error fetching vehicle:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* --------------------------------------------
   ✅ UPDATE VEHICLE (ONLY BY SELLER)
--------------------------------------------- */
router.put("/:id", authenticate, upload.single("image"), async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    if (vehicle.seller !== req.user.email) {
      return res.status(403).json({ message: "Unauthorized to edit this vehicle" });
    }

    const updatedFields = {
      title: req.body.title,
      type: req.body.type,
      description: req.body.description,
      price: req.body.price,
    };

    if (req.file) {
      updatedFields.image = req.file.filename;
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });

    res.json(updatedVehicle);
  } catch (err) {
    console.error("❌ Error updating vehicle:", err);
    res.status(500).json({ error: err.message });
  }
});

/* --------------------------------------------
   ✅ DELETE VEHICLE (ONLY BY SELLER)
--------------------------------------------- */
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    if (vehicle.seller !== req.user.email) {
      return res.status(403).json({ message: "Unauthorized to delete this vehicle" });
    }

    await vehicle.deleteOne();
    res.json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting vehicle:", err);
    res.status(500).json({ error: err.message });
  }
});
/* --------------------------------------------
   ✅ ADD REVIEW TO VEHICLE
--------------------------------------------- */
router.post("/reviews/:id", authenticate, async (req, res) => 
 {
  try {
    const { rating, comment } = req.body;
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Prevent duplicate review by same user
    const alreadyReviewed = vehicle.reviews.some(
      (review) => review.user === req.user.email
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "You already reviewed this vehicle" });
    }

    const review = {
      user: req.user.email,
      username: req.user.username || req.user.email,
      rating: Number(rating),
      comment,
    };

    vehicle.reviews.push(review);
    await vehicle.save();

    res.status(201).json({ message: "Review added successfully" });
  } catch (err) {
    console.error("❌ Error adding review:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
