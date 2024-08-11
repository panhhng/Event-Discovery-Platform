import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import HolidayList from './components/HolidayList';
import ARViewer from './components/ARViewer';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        {/* Navigation Buttons */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ margin: '0 10px', textDecoration: 'none' }}>Events</Link>
          <Link to="/add-event" style={{ margin: '0 10px', textDecoration: 'none' }}>Add Event</Link>
          <Link to="/holidays" style={{ margin: '0 10px', textDecoration: 'none' }}>Holidays</Link>
          <Link to="/ar-viewer" style={{ margin: '0 10px', textDecoration: 'none' }}>AR Viewer</Link>
        </nav>

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/add-event" element={<EventForm />} />
          <Route path="/holidays" element={<HolidayList />} />
          <Route path="/ar-viewer" element={<ARViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
