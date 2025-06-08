//chnages done in this page by varun
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DisplayMeasurementsPage.css';

const DisplayMeasurementsPage = ({ user }) => {
  const [measurements, setMeasurements] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      alert('User not logged in');
      return;
    }
  
    fetch(`/api/measurements?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setMeasurements(data))
      .catch((error) => console.error('Error fetching measurements:', error));
  }, [user]);

  const handleUpdateClick = () => {
    navigate('/measurements/update', { state: { measurements } });
  };

  return (
    <div className="measurements-page">
      <h2>Your Measurements</h2>
      {measurements ? (
        <div className="measurements-display">
          <table className="measurements-table">
            <thead>
              <tr>
                <th>Measurement</th>
                <th>Value (in inches)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(measurements).map(([key, value]) => (
                <tr key={key}>
                  <td className="measure-field">{key}</td>
                  <td className="measure-value">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="update-btn" onClick={handleUpdateClick}>
            Update Measurements
          </button>
        </div>
      ) : (
        <p>Loading measurements...</p>
      )}
    </div>
  );
};

export default DisplayMeasurementsPage;
