import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/HolidayList.css';  // Import the CSS file

const HolidayList = () => {
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/holidays')
      .then(response => {
        console.log('API Response:', response.data);

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
    <div className="holiday-container">
      <h1>Holidays</h1>
      <div className="holiday-list">
        {holidays.length > 0 ? (
          holidays.map(holiday => (
            <div className="holiday-box" key={holiday.id}>
              <h2>{holiday.name}</h2>
              <p>Date: {holiday.date}</p>
              <p>Observed: {holiday.observed}</p>
              <p>Type: {holiday.type}</p>
              <p>Public: {holiday.public ? 'Yes' : 'No'}</p>
            </div>
          ))
        ) : (
          <p>No holidays found.</p>
        )}
      </div>
    </div>
  );
};

export default HolidayList;
