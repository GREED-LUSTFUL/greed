const axios = require('axios');

async function predictDelay(features) {
  // Forward to the Python Flask service
  const resp = await axios.post(
    'https://web-production-42e10.up.railway.app/predict',
    features,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return resp.data;  // expecting { delayed, confidence }
}

module.exports = { predictDelay };
