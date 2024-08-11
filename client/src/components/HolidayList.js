import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HolidayList = () => {
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/holidays')
      .then(response => {
        console.log('API Response:', response.data);

        // Check if holidays are present in the response
        if (response.data && Array.isArray(response.data.holidays)) {
          setHolidays(response.data.holidays);
        } else {
          console.error('Unexpected response format:', response.data);
          setError('Unexpected response format');
        }
      })
      .catch(err => {
        console.error('Error fetching holidays:', err);
        setError('Error fetching holidays');
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Holidays</h1>
      <ul>
        {holidays.length > 0 ? (
          holidays.map(holiday => (
            <li key={holiday.id}>
              <h2>{holiday.name}</h2>
              <p>Date: {holiday.date}</p>
              <p>Observed: {holiday.observed}</p>
              <p>Type: {holiday.type}</p>
              <p>Public: {holiday.public ? 'Yes' : 'No'}</p>
            </li>
          ))
        ) : (
          <p>No holidays found.</p>
        )}
      </ul>
    </div>
  );
};

export default HolidayList;
