import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import sequelize from "./config/db.js";
import User from "./models/User.js";
import Gallery from "./models/Gallery.js";
import Event from "./models/Event.js";

import userRoutes from "./routes/userRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static file serving
app.use("/uploads/gallery", express.static(path.join(__dirname, "uploads/gallery")));
app.use("/uploads/events", express.static(path.join(__dirname, "uploads/events")));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventRoutes);

// DB Sync
sequelize
  .sync()
  .then(() => console.log("✅ MySQL connected & tables synced"))
  .catch((err) => console.error("❌ DB sync error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
