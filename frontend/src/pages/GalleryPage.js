import React, { useEffect, useState } from "react";
import axios from "axios";

const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get("/api/gallery");
        if (Array.isArray(res.data)) {
          setGallery(res.data);
        } else {
          console.warn("Unexpected gallery response:", res.data);
          setGallery([]);
        }
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
        setError("Failed to load gallery images.");
        setGallery([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) return <p>Loading gallery...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gallery</h2>
      {gallery.length === 0 ? (
        <p>No images in the gallery yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
          {gallery.map((item) => (
            <div key={item.id || item._id} style={{ textAlign: "center" }}>
              <img
                src={`/uploads/gallery/${item.image}`}
                alt={item.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
