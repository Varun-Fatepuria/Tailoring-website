import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MeasurementsPage.css';

// Define the 10 common measurement fields.
const commonMeasurements = [
  'Chest', 'Waist', 'Hip', 'Shoulder', 'Sleeve',
  'Length', 'Bust', 'Thigh', 'Inseam', 'Armhole'
];

const NewMeasurementsPage = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState('male');
  const [formData, setFormData] = useState(() => {
    const initial = {};
    commonMeasurements.forEach(m => {
      initial[m] = '';
    });
    return initial;
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  //changes in handle submit done  by varun
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    for (const field of commonMeasurements) {
      if (!formData[field] || formData[field] <= 0) {
        alert(`Please provide a valid (positive) value for ${field}`);
        return;
      }
    }
  
    try {
      const response = await fetch('http://localhost:5173/api/measurements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gender, ...formData }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save measurements');
      }
  
      const data = await response.json();
      console.log('Saved:', data);
      navigate('/measurements');
    } catch (error) {
      console.error('Error saving measurements:', error);
      alert('There was an error saving your measurements. Please try again.');
    }
  };
  

  return (
    <div className="measurements-page">
      <h2>Enter Your Measurements</h2>
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
        <button type="submit">Submit Measurements</button>
      </form>
    </div>
  );
};

export default NewMeasurementsPage;
