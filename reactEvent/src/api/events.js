import api from './axios';

export const getEvents = () => api.get('events/')

export const getEvent = () => api.get('events/${id}/')

export const getMyEvents = () => api.get('events/my_events/')


export const createEvent = (formData) =>
  api.post('events/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateEvent = (id, formData) =>
  api.patch(`events/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteEvent = (id) => api.delete(`events/${id}/`);

export const createRSVP = (eventId) =>
  api.post('rsvps/', { event: eventId });