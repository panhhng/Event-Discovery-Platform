import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/EventList.css'; 

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          // setError('Unexpected response format');
        }
      })
      .catch(err => {
        console.error('Error fetching events:', err);
        setError('Error fetching events');
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="events-container">
      <h1>Events</h1>
      <div className="event-list">
        {events.length > 0 ? (
          events.map(event => (
            <div className="event-box" key={event._id}>
              <h2>{event.name}</h2>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Location: {event.location}</p>
              <p>{event.description}</p>
              {event.imageUrl && <img src={event.imageUrl} alt={event.name} />}
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
