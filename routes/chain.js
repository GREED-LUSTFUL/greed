const express = require('express');
const { logEvent } = require('../services/chainService');

const router = express.Router();

router.post('/log', async (req, res) => {
  const { flightId, eventType, payload } = req.body;
  try {
    await logEvent(flightId, eventType, payload);
    res.json({ message: 'Logged' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/logs', async (req, res) => {
  const db = await require('../services/dbService')();
  const events = await db.collection('flightEvents').find().sort({ timestamp: -1 }).toArray();
  res.json(events);
});

module.exports = router;
