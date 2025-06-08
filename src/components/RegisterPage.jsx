import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Check for empty fields before making the API call
        if (!name || !email || !password) {
            setMessage("All fields are required!");
            setError(true);
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/auth/register",
                { name, email, password },
                { withCredentials: true } // Ensure cookies are sent
            );

            setMessage(res.data.message);
            setError(false);

            // Wait for a moment before redirecting to login page
            setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
            setMessage(error.response?.data?.message || "Registration failed");
            setError(true);
        }
    };

    return (
        <div className="content">
            <div className="header">Register</div>
            <form className="data" onSubmit={handleRegister}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="submit-btn" type="submit">Register</button>
                
                {message && <p className={error ? "error" : "success"}>{message}</p>}

                <div className="signin">
                    Already have an account? <a href="/login">Sign In</a>
                </div>
            </form>
        </div>
    );
};

export default Register;
