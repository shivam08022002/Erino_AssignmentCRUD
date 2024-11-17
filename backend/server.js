// server.js
const express = require('express');
const cors = require('cors');
const connetDb = require('./config/db');
const dotenv = require('dotenv').config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connetDb();

// API Route
app.use('/api/contacts',require('./routes/contactRoutes'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});