import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddVehicle.css";


function AddVehicle() {
  const [form, setForm] = useState({
    title: "",
    type: "",
    description: "",
    price: "",
    seller: "",
    phoneNumber: "",
    location: ""
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // ✅

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("type", form.type);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("seller", form.seller);
    data.append("image", image);
    data.append("phoneNumber",form.phoneNumber);
    data.append("location",form.location);

    try {
      await axios.post("http://localhost:5000/api/vehicles", data);
      alert("Vehicle added successfully ✅");
      navigate("/home"); // ✅ Redirect to vehicle list
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add vehicle");
    }
  };

  return (
<div className="sell-form">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Add Vehicle</h2>

      <input name="title" placeholder="Title" onChange={handleChange} required />
      <br />
      <select name="type" onChange={handleChange} required>
        <option value="">Select Type</option>
        <option value="car">Car</option>
        <option value="bike">Bike</option>
        <option value="scooter">Scooter</option>
        <option value="truck">Truck</option>
        <option value="auto">Auto</option>
      </select>
      <br />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <br />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
      <br />
      <input name="seller" placeholder="Seller Name" onChange={handleChange} required />
      <br />
      <input
  type="text"
  name="phoneNumber"
  placeholder="Seller Phone Number"
  value={form.phoneNumber}
  onChange={handleChange}
  required
/>
<br/>
<input
  type="text"
  name="location"
  placeholder="Location (e.g., Hyderabad, Telangana)"
  value={form.location}
  onChange={handleChange}
  required
/><br/>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
      <br />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default AddVehicle;
