// src/server.js

// import konfigurasi
const { HOST, PORT } = require('../config/env.config');

// import iibrari
const express = require('express');
const helmet = require('helmet');

const app = express();

// security headers
app.use(helmet()); 

// parsing json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((error, req, res, next) => {
    console.error(error); 
    
})

app.listen(PORT, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
});