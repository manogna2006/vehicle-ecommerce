import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    type: "",
    description: "",
    price: ""
  });

  const token = localStorage.getItem("token");

  // Load current vehicle data
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/vehicles/${id}`);
        const { title, type, description, price } = res.data;
        setForm({ title, type, description, price });
      } catch (err) {
        console.error("❌ Error fetching vehicle:", err);
        alert("Error loading vehicle data.");
      }
    };
    fetchVehicle();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/vehicles/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ Vehicle updated successfully!");
      navigate(`/vehicles/${id}`);
    } catch (err) {
      console.error("❌ Error updating vehicle:", err);
      alert("Failed to update vehicle.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Vehicle</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <input name="type" value={form.type} onChange={handleChange} placeholder="Type (Car, Bike, etc.)" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}>
          Update Vehicle
        </button>
      </form>
    </div>
  );
};

export default EditVehicle;
