import express from "express";
import QRCode from "qrcode";
import User from "../models/User.js";

const router = express.Router();

// POST /api/users/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, event } = req.body;

    // Generate QR Code
    const qrCodeData = await QRCode.toDataURL(`${name}-${email}-${event}-${Date.now()}`);

    // Save user in DB
    const user = await User.create({
      name,
      email,
      event,
      qrCodeData,
    });

    res.status(201).json({
      message: "User registered successfully",
      qrCodeData: user.qrCodeData,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// PUT: Mark as attended
router.put("/:id/attended", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isAttended = true;
    await user.save();
    res.json({ message: "Attendance marked" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update attendance" });
  }
});

export default router;
