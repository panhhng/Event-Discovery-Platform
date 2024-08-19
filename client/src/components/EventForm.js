import React, { useState } from 'react';
import axios from 'axios';
import './styles/EventForm.css'; // Assuming the CSS file

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
    imageUrl: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/events', formData)
      .then(response => {
        console.log('Event added:', response.data);
        setFormData({
          name: '',
          date: '',
          location: '',
          description: '',
          imageUrl: '',
        });
      })
      .catch(err => {
        console.error('Error adding event:', err);
        setError('Error adding event');
      });
  };

  return (
    <div className="form-container">
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="date"
          name="date"
          placeholder="Event Date"
          value={formData.date}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="location"
          placeholder="Event Location"
          value={formData.location}
          onChange={handleChange}
          className="form-input"
        />
        <input
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="submit-button">Add Event</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EventForm;
