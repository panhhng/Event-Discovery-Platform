import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        console.log('Response Data:', response.data); // Log the response data
        if (Array.isArray(response.data)) {
          setEvents(response.data); // Set the events state
        } else {
          console.warn('Unexpected data format:', response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error); // Log the error
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Events</h1>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event._id}>
              <h2>{event.name}</h2>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>{event.location}</p>
              <p>{event.description}</p>
              {event.imageUrl && <img src={event.imageUrl} alt={event.name} style={{ width: '200px', height: 'auto' }} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
