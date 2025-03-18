import React from 'react';

const LogSheet = ({ logs }) => {
  return (
    <div>
      <h2>Daily Log Sheets</h2>
      {logs.map((log, index) => (
        <div key={index}>
          <h3>Day {index + 1}</h3>
          <pre>{JSON.stringify(log, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default LogSheet;