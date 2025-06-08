const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// POST: Create a new appointment
router.post("/", async (req, res) => {
  try {
    const { name, mobile, address, date, time } = req.body;

    // Optional: Add validation here
    if (!name || !mobile || !address || !date || !time) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newAppointment = new Appointment({ name, mobile, address, date, time });
    const saved = await newAppointment.save();

    res.status(201).json({ message: "Appointment booked successfully", appointment: saved });
  } catch (err) {
    console.error("Error saving appointment:", err);
    res.status(500).json({ error: "Server error while saving appointment" });
  }
});

module.exports = router;