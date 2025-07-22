import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./Auth.css"; // ✅ for redirection

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // ✅ hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", form);
    localStorage.setItem("token", res.data.token);
    setMsg("Login successful!");

    // ✅ Redirect after 1 second
    setTimeout(() => navigate("/choose"), 1000);
  } catch (err) {
    setMsg(err.response?.data?.msg || "Login failed");
  }
};

  return (
    <div className="auth-container">
  

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ width: "100%", padding: "10px", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default Login;
