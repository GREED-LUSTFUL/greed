const axios = require('axios');

async function predictDelay(features) {
  try {
    // Replace localhost with the actual deployed URL
    const resp = await axios.post(
      'https://web-production-42e10.up.railway.app/predict',
      features,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return resp.data;  // expecting { delayed, confidence }
  } catch (err) {
    console.error('Prediction service error:', err.message);
    return { error: 'ML service unreachable or failed', details: err.message };
  }
}

module.exports = { predictDelay };
