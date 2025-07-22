import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [vehicles, setVehicles] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/vehicles");
        // Only keep vehicles that are favorited
        const filtered = res.data.filter((v) => favorites.includes(v._id));
        setVehicles(filtered);
      } catch (err) {
        console.error("Failed to load favorites", err);
      }
    };
    fetchVehicles();
  }, [favorites]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>❤️ My Favorite Vehicles</h2>
      {vehicles.length === 0 ? (
        <p>No favorites found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {vehicles.map((v) => {
            const firstImage =
              Array.isArray(v.images) && v.images.length > 0
                ? v.images[0]
                : typeof v.image === "string" && v.image
                ? v.image
                : null;

            return (
              <Link
                to={`/vehicles/${v._id}`}
                key={v._id}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "8px",
                    width: "250px",
                    background: "#fff",
                  }}
                >
                  {firstImage ? (
                    <img
                      src={`http://localhost:5000/uploads/${firstImage}`}
                      alt="Vehicle"
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        marginBottom: "10px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "150px",
                        background: "#eee",
                        textAlign: "center",
                        lineHeight: "150px",
                        color: "#777",
                        marginBottom: "10px",
                        borderRadius: "6px",
                      }}
                    >
                      No Image Available
                    </div>
                  )}

                  <h3>{v.title}</h3>
                  <p><strong>Type:</strong> {v.type}</p>
                  <p><strong>Price:</strong> ₹{v.price}</p>
                  <p><strong>Seller:</strong> {v.seller}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
