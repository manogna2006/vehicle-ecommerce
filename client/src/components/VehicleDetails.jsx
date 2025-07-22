// src/pages/VehicleDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  const token = localStorage.getItem("token");
  let currentUserEmail = null;
  let currentUsername = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      currentUserEmail = decoded.email;
      currentUsername = decoded.username || decoded.email.split("@")[0];
    } catch (e) {
      console.error("Token decode error:", e);
    }
  }

  const fetchVehicle = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/vehicles/${id}`);
      setVehicle(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch vehicle.");
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/vehicles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Deleted successfully!");
      navigate("/");
    } catch (err) {
      alert("Failed to delete vehicle.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/vehicles/${id}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviewMessage(res.data.message);
      setComment("");
      fetchVehicle();
    } catch (err) {
      setReviewMessage(err?.response?.data?.message || "Failed to post review");
    }
  };

  if (error) return <p>{error}</p>;
  if (!vehicle) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="card">
        <h2>{vehicle.title}</h2>
        <p><strong>Type:</strong> {vehicle.type}</p>
        <p><strong>Price:</strong> ₹{vehicle.price}</p>
        <p><strong>Description:</strong> {vehicle.description}</p>
        <p><strong>Seller:</strong> {vehicle.seller}</p>
        <p><strong>Phone Number:</strong> {vehicle.phoneNumber}</p>
        <p><strong>Location:</strong> {vehicle.location}</p>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
          {vehicle.images?.length > 0 ? (
            vehicle.images.map((img, i) => (
              <img
                key={i}
                src={`http://localhost:5000/uploads/${img}`}
                alt={`Vehicle ${i + 1}`}
              />
            ))
          ) : vehicle.image ? (
            <img
              src={`http://localhost:5000/uploads/${vehicle.image}`}
              alt="Vehicle"
            />
          ) : (
            <p>No Image</p>
          )}
        </div>

        {currentUserEmail === vehicle.seller && (
          <>
            <button onClick={() => navigate(`/vehicles/edit/${id}`)}>Edit</button>{" "}
            <button onClick={handleDelete}>Delete</button>
          </>
        )}

        {/* 🛒 Buy Now for non-sellers */}
        {currentUserEmail !== vehicle.seller && (
          <button
            onClick={() => navigate(`/payment/${vehicle._id}`)}
            style={{ marginTop: "10px" }}
          >
            Buy Now
          </button>
        )}
      </div>

      {token && (
        <div className="card">
          <h3>Leave a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <label>Rating (1–5): </label>
            <input
              type="number"
              value={rating}
              min="1"
              max="5"
              onChange={(e) => setRating(Number(e.target.value))}
              required
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Your comment"
              rows="3"
              required
            />
            <button type="submit">Submit Review</button>
          </form>
          {reviewMessage && <p>{reviewMessage}</p>}
        </div>
      )}

      <div className="card">
        <h3>Reviews:</h3>
        {vehicle.reviews?.length > 0 ? (
          vehicle.reviews.map((r, i) => (
            <div key={i} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
              <p><strong>{r?.username || "Anonymous"}</strong> rated: {r?.rating || "?"}/5</p>
              <p>{r?.comment || "No comment"}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default VehicleDetails;
