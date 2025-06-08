import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MyOrders.css';

const OrdersPage = () => {
  // For demonstration, assume we have a list of orders stored in state.
  const [orders, setOrders] = useState([
    {
      id: 1,
      material: 'Cotton',
      apparel: 'Shirt',
      measurements: {
        chest: 38,
        waist: 32,
        length: 30
      }
    }
  ]);

  const [updatedMeasurements, setUpdatedMeasurements] = useState({});

  const handleChange = (orderId, e) => {
    const { name, value } = e.target;
    setUpdatedMeasurements((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [name]: value
      }
    }));
  };

  const handleUpdate = (orderId) => {
    const newMeasurements = updatedMeasurements[orderId];
    if (newMeasurements) {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, measurements: { ...order.measurements, ...newMeasurements } }
            : order
        )
      );
      alert('Order measurements updated!');
    }
  };

  return (
    <div className="container">
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: '1px solid #d6c9b4',
            padding: '1rem',
            marginBottom: '1rem'
          }}
        >
          <p>
            <strong>Material:</strong> {order.material}
          </p>
          <p>
            <strong>Apparel:</strong> {order.apparel}
          </p>
          <p>
            <strong>Measurements:</strong> Chest: {order.measurements.chest}, Waist:{' '}
            {order.measurements.waist}, Length: {order.measurements.length}
          </p>
          <div className="form-group">
            <label>Update Chest:</label>
            <input
              type="number"
              name="chest"
              placeholder={order.measurements.chest}
              onChange={(e) => handleChange(order.id, e)}
            />
          </div>
          <div className="form-group">
            <label>Update Waist:</label>
            <input
              type="number"
              name="waist"
              placeholder={order.measurements.waist}
              onChange={(e) => handleChange(order.id, e)}
            />
          </div>
          <div className="form-group">
            <label>Update Length:</label>
            <input
              type="number"
              name="length"
              placeholder={order.measurements.length}
              onChange={(e) => handleChange(order.id, e)}
            />
          </div>
          <button onClick={() => handleUpdate(order.id)}>Update Measurements</button>
          <br />
          <br />
          <Link to="/appointment">
            <button>Book Appointment for Door to Door Measurement</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
