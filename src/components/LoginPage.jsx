import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:5000/auth/login",
                { email, password },
                { withCredentials: true }
            );

            //console.log("Checked");
            if (res.data.user) {
                const {user} = res.data;
                setUser(user);
                // console.log(res.data.user);
                setTimeout(() => {
                    navigate("/");
                }, 100);
            } else {
                setMessage("Login failed: No user data received");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
            console.log(error);
        }
    };

    return (
        <div className="content">
            <div className="header">Login Form</div>
            <form className="data" onSubmit={handleLogin}>
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

                <button type="submit" className="submit-btn">Login</button>
                {message && <p className="error-message">{message}</p>}
            </form>

            <div className="signup">
                Don't have an account? <a href="/register">Sign Up</a>
            </div>
        </div>
    );
};

export default Login;