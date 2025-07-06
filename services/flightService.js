// services/flightService.js
const axios = require('axios');

async function getFlightInfo(iataCode) {
  try {
    const response = await axios.get(`http://api.aviationstack.com/v1/flights`, {
      params: {
        access_key: process.env.AVIATIONSTACK_KEY,
        flight_iata: iataCode
      }
    });

    const flights = response.data.data;
    if (!flights.length) return { message: "No flights found for this code." };

    // Return a simplified array
    return flights.map(flight => ({
      date: flight.flight_date,
      status: flight.flight_status,
      departure: {
        airport: flight.departure.airport,
        scheduled: flight.departure.scheduled,
        actual: flight.departure.actual,
        delay: flight.departure.delay
      },
      arrival: {
        airport: flight.arrival.airport,
        scheduled: flight.arrival.scheduled,
        estimated: flight.arrival.estimated,
        actual: flight.arrival.actual,
        delay: flight.arrival.delay
      },
      airline: flight.airline.name,
      flightNumber: flight.flight.iata
    }));
  } catch (err) {
    console.error("Flight fetch error:", err);
    throw new Error("Failed to fetch flight info");
  }
}

module.exports = { getFlightInfo };
