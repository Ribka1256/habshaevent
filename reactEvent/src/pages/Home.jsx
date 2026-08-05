import '../style/style.css';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getFeaturedEvents } from '../api/events';
import { useAuth } from '../context/AuthContext';
import RequestModal from '../components/RequestModal';

function Home() {
  const [featured, setFeatured] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getFeaturedEvents()
      .then((res) => setFeatured(res.data))
      .catch((err) => console.error('Failed to load featured events:', err));
  }, []);

  const handleBrowse = () => {
    navigate("/eventlist");
  };
  const handleRequestSuccess = () => {
    setSelectedEvent(null);
    setSuccessMessage('Request submitted!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="app">
  
      <section className="hero">
        <h1>Welcome, {user ? user.username : 'Guest'}!</h1>
        <p>Discover and book authentic Ethiopian cultural ceremonies</p>
        <button className="btn btn--browse" onClick={handleBrowse}>🔍 Browse Ceremonies</button>
      </section>

      <section className="section">
        <h2>Featured Ceremonies</h2>
        {successMessage && <p className="status">{successMessage}</p>}
        <div className="card-grid">
          {featured.map((event) => (
            <div className="card" key={event.id}>
              <h3>{event.title}</h3>
              <p>📅 {new Date(event.start_datetime).toLocaleDateString()}</p>
              <button className="btn btn--request" onClick={() => setSelectedEvent(event)}>
                Join Request 
              </button>
            </div>
          ))}
        </div>
      </section>

      {selectedEvent && (
        <RequestModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSuccess={handleRequestSuccess}
        />
      )}
    </div>
  );
}

export default Home;