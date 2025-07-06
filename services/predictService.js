const axios = require('axios');

async function predictDelay(features) {
  // Forward to the Python Flask service
  const resp = await axios.post(
    'http://localhost:5001/predict',
    features,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return resp.data;  // expecting { delayed, confidence }
}

module.exports = { predictDelay };
