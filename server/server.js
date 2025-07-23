const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const authRoutes = require("./routes/auth");
const vehicleRoutes = require("./routes/vehicles");
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // ✅ after express.json()



dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);


const app = express();
app.use(cors({
  origin: "https://vehicle-frontend-6wm7.onrender.com",  // your frontend
  credentials: true,
  methods:["GET","POST","PUT","DELETE"],
}));
app.use(express.json());
app.use(cookieParser()); 


// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const profileRoutes = require("./routes/profile"); // ✅ Make sure not duplicated
app.use("/api/profile", profileRoutes);

const reviewRoutes = require("./routes/reviews");
app.use("/api/reviews", reviewRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

