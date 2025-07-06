const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);
const dbName = 'intelliflight';
const collectionName = 'flightEvents';

async function logEvent(flightId, eventType, payload) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const eventDoc = {
      flightId,
      eventType,
      payload,
      timestamp: new Date(),
    };

    await collection.insertOne(eventDoc);
    console.log("✅ Event logged to MongoDB");
  } catch (err) {
    console.error("❌ Error logging event:", err);
    throw err;
  } finally {
    await client.close();
  }
}

module.exports = { logEvent };
