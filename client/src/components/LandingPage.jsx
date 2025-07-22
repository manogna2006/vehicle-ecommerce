import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Footer from "../components/Footer"; // ✅

const LandingPage = () => {
  const navigate = useNavigate();

  const images = ["/image1.png", "/image2.png", "/image3.png", "/image.png"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div
        className="landing-container"
        style={{
          backgroundImage: `url(${images[current]})`,
          transition: "background-image 1s ease-in-out",
        }}
      >
        <div className="overlay">
          <h1 className="landing-title">🚗 Second-Hand Vehicle Marketplace</h1>
          <p className="landing-subtitle">Buy or Sell Cars, Bikes, Autos & More</p>
          <div className="landing-buttons">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>
        </div>
      </div>

      {/* ✅ Footer added below main landing container */}
      <Footer />
    </>
  );
};

export default LandingPage;
