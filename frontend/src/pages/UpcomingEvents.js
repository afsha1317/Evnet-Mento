import React, { useEffect, useState } from "react";
import axios from "axios";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  return (
    <div className="events-page">
      <h2>📅 Upcoming Events</h2>
      <div className="events-grid">
        {events.length === 0 ? (
          <p>No upcoming events</p>
        ) : (
          events.map((ev) => (
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
