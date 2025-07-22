import React from "react";
import { useNavigate } from "react-router-dom";

const ChooseAction = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>What would you like to do?</h2>
      <button
        onClick={() => navigate("/home")}
        style={{
          padding: "12px 24px",
          margin: "20px",
          fontSize: "18px",
          borderRadius: "8px",
          cursor: "pointer",
          background: "#4CAF50",
          color: "white",
          border: "none"
        }}
      >
        🛒 Buy Vehicles
      </button>
      <button
        onClick={() => navigate("/add-vehicle")}
        style={{
          padding: "12px 24px",
          margin: "20px",
          fontSize: "18px",
          borderRadius: "8px",
          cursor: "pointer",
          background: "#2196F3",
          color: "white",
          border: "none"
        }}
      >
        🛠️ Sell a Vehicle
      </button>
    </div>
  );
};

export default ChooseAction;
