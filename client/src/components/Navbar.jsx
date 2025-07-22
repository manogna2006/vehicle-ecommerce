import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkStyle = {
    color: "white",
    marginRight: "15px",
    textDecoration: "none",
    fontWeight: "bold"
  };

  return (
    <nav style={{
      backgroundColor: "#222",
      padding: "12px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <div>
        <span style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>
          🛻 Vehicle Commerce
        </span>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/home" style={linkStyle}>Buy</Link>
            <Link to="/about" style={linkStyle}>About</Link>
<Link to="/blog" style={linkStyle}>Blog</Link>
<Link to="/home" style={linkStyle}>Buy</Link>

            <Link to="/add-vehicle" style={linkStyle}>Sell</Link>
            <Link to="/favorites" style={linkStyle}>Favorites</Link>
            <Link to="/profile" style={linkStyle}>Profile</Link>

            <button onClick={handleLogout} style={{
              background: "#ff4d4d",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer"
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
