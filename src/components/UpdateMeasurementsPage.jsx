//changes done in this page by varun
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/MeasurementsPage.css';

const commonMeasurements = [
  'Chest', 'Waist', 'Hip', 'Shoulder', 'Sleeve',
  'Length', 'Bust', 'Thigh', 'Inseam', 'Armhole'
];

const UpdateMeasurementsPage = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const existing = location.state?.measurements || {};

  const [gender, setGender] = useState(existing.gender || 'male');
  const [formData, setFormData] = useState(() => {
    const initial = {};
    commonMeasurements.forEach(m => {
      initial[m] = existing[m] || '';
    });
    return initial;
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    for (const field of commonMeasurements) {
      if (!formData[field] || formData[field] <= 0) {
        alert(`Please provide a valid (positive) value for ${field}`);
        return;
      }
    }

    // Ensure user is logged in and pass the userId in the API call
    if (!user?.userId) {
      alert('User not logged in');
      return;
    }

    try {
      const response = await fetch('/api/measurements/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.userId, gender, ...formData }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/measurements');
      } else {
        alert('Failed to update measurements');
      }
    } catch (err) {
      console.error('Error updating measurements:', err);
      alert('Server error while updating');
    }
  };

  return (
    <div className="measurements-page">
      <h2>Update Your Measurements</h2>
      <form onSubmit={handleSubmit} className="measurement-form">
        <div className="gender-select">
          <label>Select Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="measurement-fields">
          {commonMeasurements.map((field) => (
            <div className="form-group" key={field}>
              <label>{field} (in inches):</label>
              <input
                type="number"
                min="1"
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button type="submit">Update Measurements</button>
      </form>
    </div>
  );
};

export default UpdateMeasurementsPage;
