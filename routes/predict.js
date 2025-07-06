const express = require('express');
const { predictDelay } = require('../services/predictService');
const { logEvent } = require('../services/chainService');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const input = req.body;
    const result = predictDelay(input);
    res.json(result);

    await logEvent(input.flightId || 'UNKNOWN', 'DELAY_PREDICTED', result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
