import React from "react";
import { useNavigate } from "react-router-dom";

const ChooseRole = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      background: "#f4f4f4",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h2>Welcome! What would you like to do?</h2>
      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => navigate("/home")}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            marginRight: "20px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Buy Vehicles
        </button>
        <button
          onClick={() => navigate("/add-vehicle")}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Sell a Vehicle
        </button>
      </div>
    </div>
  );
};

export default ChooseRole;
