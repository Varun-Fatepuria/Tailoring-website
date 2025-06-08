import React, { useEffect, useState } from 'react';
import '../styles/MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/customizations/my-orders', {
          credentials: 'include', // Important to include session cookie
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <h3>{order.category.toUpperCase()}</h3>
              <ul>
                {Object.entries(order.selections).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
              <p><strong>Price:</strong> ₹{order.price}</p>
              <p><em>{new Date(order.createdAt).toLocaleString()}</em></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
