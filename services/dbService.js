// services/dbService.js
const mongoose = require('mongoose');

// Connect once at startup
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const flightEventSchema = new mongoose.Schema({
  flight_iata:      { type: String, required: true },
  event_type:      { type: String, required: true },
  payload:         { type: mongoose.Schema.Types.Mixed },
  occurred_at:     { type: Date, default: Date.now }
});

const FlightEvent = mongoose.model('FlightEvent', flightEventSchema);

async function recordEvent({ flight_iata, event_type, payload }) {
  const evt = new FlightEvent({ flight_iata, event_type, payload });
  return await evt.save();
}

module.exports = { recordEvent };
