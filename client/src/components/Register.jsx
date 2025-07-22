import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./Auth.css"; // ✅

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // ✅

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.username || !form.email || !form.password || !form.role) {
    setMsg("All fields are required!");
    return;
  }

  console.log("Form submitted:", form); // Debug

  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", form);
    setMsg(res.data.msg);
    navigate("/login"); // redirect
  } catch (err) {
    setMsg(err.response?.data?.msg || "Error occurred");
  }
};


  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input  style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}name="username" placeholder="Username" onChange={handleChange} required />
        <input  style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}name="email" placeholder="Email" onChange={handleChange} required />
        <input style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input  style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}
  name="phone"
  placeholder="Phone Number"
  onChange={handleChange}
  required
/>
<input  style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}
  name="location"
  placeholder="Location"
  onChange={handleChange}
  required
/>

        <select style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}  name="role" onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button type="submit" style={{ width: "100%", padding: "10px", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Register</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default Register;
