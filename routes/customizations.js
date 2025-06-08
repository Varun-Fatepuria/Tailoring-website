const express = require('express');
const mongoose = require('mongoose'); // ✅ Needed for ObjectId conversion
const router = express.Router();
const Customization = require('../models/Customization');

// POST: Save a customization
router.post('/', async (req, res) => {
  try {
    const { category, selections, price } = req.body;
    const userId = req.session.user?.id; // ✅ Access user ID from session

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const newCustomization = new Customization({
      userId: mongoose.Types.ObjectId(userId),
      category,
      selections,
      price
    });

    const saved = await newCustomization.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving customization:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to save customization' });
  }
});

// GET: Fetch all customizations for a user via param
router.get('/:userId', async (req, res) => {
  try {
    const customizations = await Customization.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(customizations);
  } catch (err) {
    console.error('Error fetching customizations:', err.message);
    res.status(500).json({ error: 'Failed to fetch customizations' });
  }
});

// GET: Fetch logged-in user's orders from session
router.get('/my-orders', async (req, res) => {
  try {
    const userId = req.session.user?.id;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const orders = await Customization.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching my orders:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;