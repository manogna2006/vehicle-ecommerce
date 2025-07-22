// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/vehicles");
        setVehicles(res.data);
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
      }
    };
    fetchVehicles();
  }, []);

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const filtered = vehicles.filter((v) => {
    const matchesSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category ? v.type === category : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-container">
      <h1>Browse Vehicles</h1>

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Types</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="auto">Auto</option>
          <option value="truck">Truck</option>
          <option value="scooter">Scooter</option>
        </select>
      </div>

      <div className="vehicle-grid">
        {filtered.length === 0 ? (
          <p>No vehicles found.</p>
        ) : (
          filtered.map((v) => {
            const firstImage =
              Array.isArray(v.images) && v.images.length > 0
                ? v.images[0]
                : typeof v.image === "string" && v.image.length > 0
                ? v.image
                : null;

            return (
              <div className="vehicle-card" key={v._id}>
                <Link to={`/vehicles/${v._id}`} className="card-link">
                  {firstImage ? (
                    <img
                      src={`http://localhost:5000/uploads/${firstImage}`}
                      alt={v.title}
                      className="vehicle-image"
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}

                  <div className="vehicle-info">
                    <h3>{v.title}</h3>
                    <p><strong>Type:</strong> {v.type}</p>
                    <p><strong>Price:</strong> ₹{v.price}</p>
                    <p><strong>Seller:</strong> {v.seller}</p>
                  </div>
                </Link>
             <Link to={`/vehicles/${v._id}`}>
  <button
    style={{
      marginTop: "10px",
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "15px"
    }}
  >
    View Details
  </button>
</Link>

                <button
                  onClick={() => toggleFavorite(v._id)}
                  className={`favorite-btn ${favorites.includes(v._id) ? "favorited" : ""}`}
                >
                  ♥
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
