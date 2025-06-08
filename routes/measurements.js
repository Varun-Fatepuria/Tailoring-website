const express = require('express');
const router = express.Router();
const Measure = require('../models/Measure');

// POST /api/measurements
router.post('/', async (req, res) => {
  try {
    const newMeasure = new Measure(req.body);
    const saved = await newMeasure.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving measurements:', err);
    res.status(500).json({ error: 'Failed to save measurements' });
  }
});

// PUT /api/measurements/update
router.put('/update', async (req, res) => {
  try {
    const { userId, gender, ...measurements } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const updated = await Measure.findOneAndUpdate(
      { userId },
      { gender, ...measurements },
      { new: true, upsert: true } // Creates if not exists
    );

    res.json({ success: true, updated });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET /api/measurements
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;  // Assuming the userId is passed in query params
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const measurements = await Measure.findOne({ userId });

    if (!measurements) {
      return res.status(404).json({ success: false, message: 'Measurements not found' });
    }

    res.json(measurements); // Send the measurements data
  } catch (err) {
    console.error('Error fetching measurements:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports = router;
