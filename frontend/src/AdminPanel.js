import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [events, setEvents] = useState([]);

  // Gallery form states
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryImage, setGalleryImage] = useState(null);

  // Event form states
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventBanner, setEventBanner] = useState(null);

  // Fetch all data on mount
  useEffect(() => {
    fetchUsers();
    fetchGallery();
    fetchEvents();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/gallery");
      setGallery(res.data);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  const markAttended = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}/attended`);
      fetchUsers();
    } catch (err) {
      console.error("Failed to mark attended:", err);
    }
  };

  // =================== GALLERY ===================
  const handleGalleryUpload = async (e) => {
    e.preventDefault();
    if (!galleryTitle || !galleryImage) return alert("Title and Image are required!");

    const formData = new FormData();
    formData.append("title", galleryTitle);
    formData.append("image", galleryImage);

    try {
      await axios.post("http://localhost:5000/api/gallery/upload", formData);
      setGalleryTitle("");
      setGalleryImage(null);
      fetchGallery();
    } catch (err) {
      console.error("Gallery upload error:", err);
      alert("Failed to upload gallery image.");
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/gallery/${id}`);
      fetchGallery();
    } catch (err) {
      console.error("Gallery delete error:", err);
    }
  };

  // =================== EVENTS ===================
  const handleEventUpload = async (e) => {
    e.preventDefault();
    if (!eventTitle || !eventDate || !eventTime || !eventVenue || !eventBanner) {
      return alert("All event fields are required!");
    }

    const formData = new FormData();
    formData.append("title", eventTitle);
    formData.append("date", eventDate);
    formData.append("time", eventTime);
    formData.append("venue", eventVenue);
    formData.append("banner", eventBanner);

    try {
      await axios.post("http://localhost:5000/api/events/upload", formData);
      setEventTitle("");
      setEventDate("");
      setEventTime("");
      setEventVenue("");
      setEventBanner(null);
      fetchEvents();
    } catch (err) {
      console.error("Event upload error:", err);
      alert("Failed to upload event.");
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.error("Event delete error:", err);
    }
  };

  return (
    <div className="admin-container">
      {/* USERS */}
      <h2>📋 Admin Panel – Registered Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Event</th>
            <th>QR Code</th>
            <th>Attended</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.event}</td>
              <td>
                {u.qrCodeData && (
                  <img src={u.qrCodeData} alt="QR" className="qr-small" />
                )}
              </td>
              <td>{u.isAttended ? "✅ Yes" : "❌ No"}</td>
              <td>
                {!u.isAttended && (
                  <button onClick={() => markAttended(u.id)}>Mark as Attended</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* GALLERY */}
      <h2>🖼 Gallery</h2>
      <form onSubmit={handleGalleryUpload} className="upload-form">
        <input
          type="text"
          placeholder="Title"
          value={galleryTitle}
          onChange={(e) => setGalleryTitle(e.target.value)}
        />
        <input type="file" onChange={(e) => setGalleryImage(e.target.files[0])} />
        <button type="submit">Upload Image</button>
      </form>
      <div className="gallery-grid">
        {gallery.map((item) => (
          <div className="gallery-card" key={item.id}>
            <img
              src={`http://localhost:5000/uploads/gallery/${item.image}`}
              alt={item.title}
            />
            <p>{item.title}</p>
            <button onClick={() => handleDeleteGallery(item.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* EVENTS */}
      <h2>📅 Upcoming Events</h2>
      <form onSubmit={handleEventUpload} className="upload-form">
        <input
          type="text"
          placeholder="Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <input
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Venue"
          value={eventVenue}
          onChange={(e) => setEventVenue(e.target.value)}
        />
        <input type="file" onChange={(e) => setEventBanner(e.target.files[0])} />
        <button type="submit">Upload Event</button>
      </form>
      <div className="events-grid">
        {events.map((ev) => (
          <div className="event-card" key={ev.id}>
            <img
              src={`http://localhost:5000/uploads/events/${ev.banner}`}
              alt={ev.title}
            />
            <p>
              <b>{ev.title}</b> <br />
              {ev.date} | {ev.time} <br />
              {ev.venue}
            </p>
            <button onClick={() => handleDeleteEvent(ev.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
