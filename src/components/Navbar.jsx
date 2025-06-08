import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Navbar.css";

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true })
      .then(() => setUser(null));
  };

  return (
    <nav className="navbar">
      <Link to="/"><h1>BRish Tailors</h1></Link>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/measurements/display">Measurements</Link></li>
        <li><Link to="/my-orders">My Orders</Link></li>

        {user ? (
          <>
            <li>Welcome, {user.name}</li>
            <li>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="btn">Login</Link></li>
            <li><Link to="/signup" className="btn">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
