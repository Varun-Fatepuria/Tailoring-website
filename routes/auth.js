const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

// 📌 Register Route (Hashing the password before storing)
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already in use. Please use a different email." });
    }

    try {
        const saltRounds = 10; // Number of salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// 📌 Login Route (Verifying password with bcrypt)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    //console.log("Received:", email, password);

    const user = await User.findOne({ email });
    //console.log("User from DB:", user);

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    req.session.user = { id: user._id, email: user.email, name: user.name };
    res.cookie("auth", user._id, { maxAge: 20 * 60 * 1000, httpOnly: true });

    res.json({ message: "Login successful", user: req.session.user });
});

// 📌 Check Session Route
router.get("/check-session", (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

// 📌 Logout Route
router.post("/logout", (req, res) => {
    req.session.destroy();
    res.clearCookie("auth", { path: "/" });
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
