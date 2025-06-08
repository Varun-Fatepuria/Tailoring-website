import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import MeasurementsPage from "./components/NewMeasurementsPage";
import UpdateMeasurementsPage from "./components/UpdateMeasurementsPage";
import DisplayMeasurementsPage from "./components/DisplayMeasurementsPage";
import OrdersPage from "./components/OrdersPage";
import AppointmentPage from "./components/AppointmentPage";
import Login from "./components/LoginPage";
import Register from "./components/RegisterPage";
import MyOrders from './components/MyOrders';
import Customizer from "./components/Customizer";
import axios from "axios";


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/check-session", { withCredentials: true })
      .then((res) => {
        if (res.data.loggedIn) {
          setUser(res.data.user);
        }
      });
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/measurements" element={<MeasurementsPage user={user} />} />
        <Route path="/measurements/update" element={<UpdateMeasurementsPage user={user} />} />
        <Route path="/measurements/display" element={<DisplayMeasurementsPage user={user} />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/customizer" element={<Customizer />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
};

export default App;
