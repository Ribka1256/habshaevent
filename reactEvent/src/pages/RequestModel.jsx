
import { useState } from 'react';
import { createRSVP } from '../api/events';
import '../style/modal.css';

function RequestModel({ eventId, onClose }) {
    const [guestCount, setGuestCount] = useState(1);
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try{
            await createRSVP(eventId, guestCount, notes);
        onSuccess();
    } catch (err) {
      setError('Failed to submit request. You may have already requested this event.');
    } finally {
      setSubmitting(false);
    }
    }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3>Request: {event.title}</h3>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal__body">
          <div className="form__group">
            <label htmlFor="eventDate">Event Date</label>
            <input
              id="eventDate"
              type="text"
              value={new Date(event.start_datetime).toLocaleDateString()}
              disabled
            />
          </div>

          <div className="form__group">
            <label htmlFor="guests">Number of Guests</label>
            <input
              id="guests"
              type="number"
              min="1"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests..."
            />
          </div>

          <p className="modal__meta">
            📅 {new Date(event.start_datetime).toLocaleDateString()} &nbsp;|&nbsp; 📍 {event.location}
          </p>
          <p className="modal__meta">
            💰 {event.price ? `ETB ${event.price}` : 'Free'}
          </p>

          {error && <p className="status status--error">{error}</p>}

          <button className="btn btn--main" type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : '📩 Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
export default RequestModel;