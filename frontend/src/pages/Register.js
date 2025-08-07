import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("");
  const [qrCode, setQrCode] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        event,
      });

      if (res.data.qrCodeData) {
        setQrCode(res.data.qrCodeData);
        alert("Registration successful!");
      } else {
        alert("No QR Code received!");
      }
    } catch (error) {
      alert("Registration failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>QRPay Event Registration</h2>
      <form
        onSubmit={handleRegister}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Event"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>

      {qrCode && (
        <div style={{ marginTop: "20px" }}>
          <h4>Your QR Code:</h4>
          <img src={qrCode} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default Register;
