// routes/predict.js
const express = require('express');
const router = express.Router();

const { predictDelay } = require('../services/predictService');
const { logEvent }     = require('../services/chainService');

router.post('/', async (req, res) => {
  try {
    const {
      AIRLINE,
      ORIGIN_AIRPORT,
      DESTINATION_AIRPORT,
      DISTANCE,
      SCHEDULED_DEPARTURE,
      flightId
    } = req.body;

    const features = {
      AIRLINE,
      ORIGIN_AIRPORT,
      DESTINATION_AIRPORT,
      DISTANCE,
      SCHEDULED_DEPARTURE
    };

    // 1) Get prediction from Python service
    const result = await predictDelay(features);

    // 2) Send prediction back immediately
    res.json(result);

    // 3) Log to MongoDB in background (errors are caught and ignored)
    logEvent(flightId || 'UNKNOWN', 'DELAY_PREDICTED', result)
      .catch(err => console.error('❌ Error logging event (ignored):', err.message));

  } catch (err) {
    console.error('❌ Prediction error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Prediction failed.' });
    }
  }
});

module.exports = router;
