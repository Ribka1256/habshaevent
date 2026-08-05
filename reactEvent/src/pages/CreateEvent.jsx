import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api/events';
import '../style/form.css';

function CreateEvent(){
const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDatetime, setStartDatetime] = useState('');
  const [endDatetime, setEndDatetime] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [coverImage, setCoverImage] = useState(null);
  const [status, setStatus] = useState('draft');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setError('')
    const formData = new FormData;
    formData.append('title', title)
    formData.append('description', description)
    formData.append('location', location)
    formData.append('start_datetime', startDatetime)
    formData.append('end_datetime', endDatetime)
    formData.append('capacity', capacity)
    formData.append('status', status)
    formData.append('link', link)
    if (coverImage) formData.append('cover_image', coverImage);
  
  try{
    await createEvent(formData);
    navigate('/dashboard')
  }catch(err) {
      setError('Failed to create event. Check your inputs.');
    }
}
    return (
    <div className="section" id='color'>
      <div className="form-card">
        <h2>Create Ceremony</h2>
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
            <label htmlFor="start">Start Date/Time</label>
            <input id="start" type="datetime-local" value={startDatetime} onChange={(e) => setStartDatetime(e.target.value)} />
          </div>

          <div className="form__group">
            <label htmlFor="end">End Date/Time</label>
            <input id="end" type="datetime-local" value={endDatetime} onChange={(e) => setEndDatetime(e.target.value)} />
          </div>

          <div className="form__group">
            <label htmlFor="capacity">Capacity (0 = unlimited)</label>
            <input id="capacity" type="number" min="0" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
          </div>

          <div className="form__group">
            <label htmlFor="cover">Cover Image</label>
            <input id="cover" type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} />
          </div>
  <div className="form__group">
            <label htmlFor="link">Link</label>
            <input id="link" value={link} onChange={(e) => setLink(e.target.value)} />
          </div>
          <div className="form__group">
            <label htmlFor="status">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {error && <p className="status status--error">{error}</p>}

          <button className="btn btn--main" type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );

}

export default CreateEvent;