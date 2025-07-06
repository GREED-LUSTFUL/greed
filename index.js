require('dotenv').config();
const express = require('express');
const cors = require('cors');

const flightsRouter = require('./routes/flight');
const predictRouter = require('./routes/predict');
const chainRouter = require('./routes/chain');

const app = express(); // ✅ Initialize app before using it
app.use(cors());        // ✅ Now you can use CORS
app.use(express.json());

app.use('/flights', flightsRouter);
app.use('/predict', predictRouter);
app.use('/chain', chainRouter);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to IntelliFlight API' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
