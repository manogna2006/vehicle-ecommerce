import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import AddVehicle from "./components/AddVehicle";
import VehicleDetails from "./components/VehicleDetails";
import Favorites from "./components/Favorites";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile"; // adjust path if in pages/
// App.js
import ChooseAction from "./components/ChooseAction";
import About from "./components/About";
import Blog from "./components/Blog";
import EditVehicle from "./components/EditVehicle"; 
import PaymentPage from "./components/PaymentPage";
import './App.css';







function App() {
  const [vehicles, setVehicles] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // ✅ Fetch vehicle list from backend
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/vehicles");
        const data = await res.json();
        setVehicles(data);
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <Home
              vehicles={vehicles}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/choose" element={<ChooseAction />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
<Route path="/blog" element={<Blog />} />
<Route path="/vehicles/edit/:id" element={<EditVehicle />} />
<Route path="/payment/:id" element={<PaymentPage />} />

        <Route
          path="/favorites"
          element={
            <Favorites
              vehicles={vehicles}
              favorites={favorites}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
