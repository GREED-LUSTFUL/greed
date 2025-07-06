const express = require('express');
const router  = express.Router();
const { getFlightInfo } = require('../services/flightService');

router.get('/:iata', async (req, res, next) => {
  try {
    const data = await getFlightInfo(req.params.iata);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
