import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, updateEvent } from '../api/events';
import '../style/form.css';

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('draft');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvent(id)
      .then((res) => {
        const ev = res.data;
        setTitle(ev.title);
        setDescription(ev.description);
        setLocation(ev.location);
        setStatus(ev.status);
      })
      .catch(() => setError('Failed to load event'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('status', status);

    try {
      await updateEvent(id, formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to update event.');
    }
  };

  if (loading) return <p className="status">Loading...</p>;

  return (
    <div className="section">
      <div className="form-card">
        <h2>Edit Ceremony</h2>
        <form onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="title">Title</label>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="form__group">
            <label htmlFor="description">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="form__group">
            <label htmlFor="location">Location</label>
            <input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div className="form__group">
            <label htmlFor="status">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {error && <p className="status status--error">{error}</p>}

          <button className="btn btn--main" type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;