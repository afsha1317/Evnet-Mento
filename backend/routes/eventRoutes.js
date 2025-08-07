import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Event from "../models/Event.js";

const router = express.Router();

// ================= Multer Storage =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/events";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ================= Routes =================

// POST: Upload Event
router.post("/upload", upload.single("banner"), async (req, res) => {
  try {
    console.log("Event Upload Data:", req.body, req.file);

    const { title, date, time, venue } = req.body;
    if (!title || !date || !time || !venue || !req.file) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const event = await Event.create({
      title,
      date,
      time,
      venue,
      banner: req.file.filename,
    });

    res.status(201).json(event);
  } catch (err) {
    console.error("❌ Event upload error:", err);
    res.status(500).json({ error: "Event upload failed" });
  }
});

// GET: All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.findAll({ order: [["createdAt", "DESC"]] });
    res.json(events);
  } catch (err) {
    console.error("❌ Fetch events error:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// DELETE: Event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // Delete banner image
    const imagePath = path.join("uploads/events", event.banner);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await event.destroy();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("❌ Event delete error:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

export default router;
