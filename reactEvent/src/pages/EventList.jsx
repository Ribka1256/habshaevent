import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../api/events';
import '../style/events.css';

function EventList(){

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() =>{
        getEvents()
        .then((res) => setEvents(res.data))
        .catch(() => setError('Failed to load events'))
      .finally(() => setLoading(false));
    },[])
if (loading) return <p className="status">Loading events...</p>;
if (error) return <p className="status status--error">{error}</p>;

  return (
    <div className="section">
      <h2>Browse Ceremonies</h2>
      <div className="card-grid">
        {events.map((event) => (
          <div className="card" key={event.id}>
            <h3>{event.title}</h3>
            <p>📅 {new Date(event.start_datetime).toLocaleDateString()}</p>
            <p>📍 {event.location}</p>
            <Link to={`/events/${event.id}`} className="btn btn--request">
              View Details
            </Link>
          </div>
        ))}
        {events.length === 0 && <p className="status">No events published yet.</p>}
      </div>
    </div>
  );
}

export default EventList;