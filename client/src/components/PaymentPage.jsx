import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [method, setMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/vehicles/${id}`)
      .then((res) => setVehicle(res.data))
      .catch((err) => console.error("Failed to fetch vehicle:", err));
  }, [id]);

  const handlePayment = () => {
    if (method === "card") {
      if (!cardNumber || !expiry || !cvv) {
        alert("Please fill all card details.");
        return;
      }
    }

    if (method === "upi") {
      if (!upiId) {
        alert("Please enter UPI ID.");
        return;
      }
    }

    // Simulated success
    alert("✅ Payment successful! Vehicle booked.");
    navigate("/");
  };

  if (!vehicle) return <p>Loading vehicle details...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payment for: {vehicle.title}</h2>
      <p><strong>Type:</strong> {vehicle.type}</p>
      <p><strong>Price:</strong> ₹{vehicle.price}</p>

      <h3>Choose Payment Method:</h3>
      <label>
        <input
          type="radio"
          value="card"
          checked={method === "card"}
          onChange={(e) => setMethod(e.target.value)}
        />{" "}
        Credit / Debit Card
      </label><br />
      <label>
        <input
          type="radio"
          value="upi"
          checked={method === "upi"}
          onChange={(e) => setMethod(e.target.value)}
        />{" "}
        UPI
      </label><br />
      <label>
        <input
          type="radio"
          value="cod"
          checked={method === "cod"}
          onChange={(e) => setMethod(e.target.value)}
        />{" "}
        Cash on Delivery
      </label><br /><br />

      {/* Card Details */}
      {method === "card" && (
        <div>
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          /><br />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          /><br />
          <input
            type="password"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          /><br /><br />
        </div>
      )}

      {/* UPI Input */}
      {method === "upi" && (
        <div>
          <input
            type="text"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            required
          /><br /><br />
        </div>
      )}

      {/* COD Message */}
      {method === "cod" && (
        <p><strong>Note:</strong> You’ll pay on delivery.</p>
      )}

      <button onClick={handlePayment} style={{ marginTop: "10px" }}>
        {method === "cod" ? "Place Order" : "Pay Now"}
      </button>
    </div>
  );
};

export default PaymentPage;
