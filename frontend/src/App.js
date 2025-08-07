import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import GalleryPage from './pages/GalleryPage';
import UpcomingEvents from './pages/UpcomingEvents';
import AdminPanel from './AdminPanel'; // ✅ Your combined admin panel
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <nav style={{ marginBottom: '2rem' }}>
          <Link to="/">📝 Register</Link> |{' '}
          <Link to="/gallery">🖼️ Gallery</Link> |{' '}
          <Link to="/events">📅 Events</Link> |{' '}
          <Link to="/admin">🧾 Admin</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<UpcomingEvents />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
