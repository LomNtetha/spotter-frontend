import React, { useState } from 'react';
import Header from './components/Header';
import TripForm from './components/TripForm';
import Map from './components/Map';
import LogSheet from './components/LogSheet';
import './App.css';

const App = () => {
  const [route, setRoute] = useState(null);
  const [logs, setLogs] = useState([]);

  const handleTripSubmit = (data) => {
    // Set route and logs based on API response
    setRoute(data.route);
    setLogs(data.logs);
  };

  return (
    <div className="App">
      <Header />
      <TripForm onSubmit={handleTripSubmit} />
      {route && <Map route={route} />}
      {logs.length > 0 && <LogSheet logs={logs} />}
    </div>
  );
};

export default App;