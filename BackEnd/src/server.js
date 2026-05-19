// src/server.js

// Import library dan modul yang diperlukan
const express = require('express');

// Config
const { HOST, PORT } = require('../config/env.config');
const app = express();

// Global error handler
app.use((error, req, res, next) => {
  console.error(error);
  if (error) {
    res.status(error.statusCode).json({ status: 'failed', message: error.message });
  }
});

// Menjalankan server
app.listen(PORT, () => console.log(`Server running on ${HOST}:${PORT}`));