import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../api/events';
import RequestModal from '../components/RequestModal';
import '../style/events.css';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch(() => setError('Failed to load events'))
      .finally(() => setLoading(false));
  }, []);

  const handleRequestSuccess = () => {
    setSelectedEvent(null);
    setSuccessMessage('Request submitted!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (loading) return <p className="status">Loading events...</p>;
  if (error) return <p className="status status--error">{error}</p>;

  return (
  <div className="app">
    <div className="section">
      <h2>Browse Ceremonies</h2>
      {successMessage && <p className="status">{successMessage}</p>}
      <div className="card-grid">
        {events.map((event) => (
          <div className="card" key={event.id}>
            <h3>{event.title}</h3>
            <p>📅 {new Date(event.start_datetime).toLocaleDateString()}</p>
            <p>📍 {event.location}</p>
            <Link to={`/events/${event.id}`} className="btn btn--request">
              View Details
            </Link>
            <button className="btn btn--request" onClick={() => setSelectedEvent(event)}>
              Request
            </button>
          </div>
        ))}
      </div>
    </div>
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

export default EventList;