import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent, createRSVP } from '../api/events';
import { useAuth } from '../context/AuthContext';
import '../style/events.css';

function EventDetail(){
  const { id } = useParams();
  const { accessToken } = useAuth();
  const [event, setEvent] = useState(null);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getEvent(id) 
    .then((res) => setEvent(res.data)) 
    .catch(() => setRsvpMessage('Failed to load event'))
    .finally(() => setLoading(false))
  }, [id])
const handleRSVP = async () =>{
    try{
        await createRSVP(id);
      setRsvpMessage('You are booked in!');
    } catch (err) {
      setRsvpMessage('Could not complete RSVP.');
    }
}
if (loading) return <p className="status">Loading...</p>;
if (!event) return <p className="status status--error">Event not found.</p>;

return(
  <div id='color'>
    <div className="section detail" >
        <div className="detail__card">
            <h2>{event.title}</h2>

    <p className="detail__meta">
      📅 {new Date(event.start_datetime).toLocaleString()}&nbsp;|&nbsp; 📍 {event.location}
    </p>

    <p>
{event.description}
    </p>

    <p>
      👥 {event.attendee_count} attending{event.is_full ? ' (full — waitlist only)' : ''}
    </p>



        {accessToken ? (
          <button className="btn btn--request" onClick={handleRSVP}>
            {event.is_full ? 'Join Waitlist' : 'RSVP'}
          </button>
        ) : (
          <p className="status">Log in to RSVP.</p>
        )}

        {rsvpMessage && <p className="status">{rsvpMessage}</p>}
        </div>
    </div>
    </div>
)
}

export default EventDetail;