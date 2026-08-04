
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyEvents, deleteEvent } from '../api/events';
import '../style/dashboard.css';

function Dashboard(){
 const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);


   const loadEvents = () =>{
    getMyEvents()
    .then((res) => setMyEvents(res.data))
    .catch((err) => console.error('Failed to load events:', err))
    .finally(() => setLoading(false))
   }

   useEffect(() =>{
loadEvents()
   },[])
   const handleDelete = async(id) =>{
if (!window.confirm('Delete this event?')) return;
    await deleteEvent(id);
    setMyEvents((prev) => prev.filter((e) => e.id !== id));
   }
    if (loading) return <p className="status">Loading dashboard...</p>;

  return (
    <div className="section">
      <div className="dashboard__header">
        <h2>My Ceremonies</h2>
        <Link to="/events/create" className="btn btn--main">+ Create Event</Link>
      </div>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Attendees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myEvents.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>
                <span className={`badge badge--${event.status}`}>{event.status}</span>
              </td>
              <td>{event.attendee_count}</td>
              <td className="dashboard-actions">
                <Link to={`/events/${event.id}/edit`} className="btn btn--small">Edit</Link>
                <button className="btn btn--small btn--danger" onClick={() => handleDelete(event.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {myEvents.length === 0 && (
            <tr><td colSpan="4" className="status">No events yet — create your first one!</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );

}

export default Dashboard;