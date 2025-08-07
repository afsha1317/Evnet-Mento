import express from "express";
import multer from "multer";
import path from "path";
import Gallery from "../models/Gallery.js";

const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/gallery"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Fetch all gallery images
router.get("/", async (req, res) => {
  try {
    const gallery = await Gallery.findAll();
    res.json(gallery);
  } catch (error) {
    console.error("Gallery fetch error:", error);
    res.status(500).json({ message: "Failed to fetch gallery" });
  }
});

// Upload gallery image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const newImage = await Gallery.create({
      title,
      image: req.file.filename,
    });

    res.json(newImage);
  } catch (error) {
    console.error("Gallery upload error:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
});

export default router;
