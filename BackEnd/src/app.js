// src/app.js

require('dotenv').config();

// library
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const xss = require('xss-clean');
const sanitize = require('perfect-express-sanitizer');

// config & utils
const { connectDB } = require('../config/db.config');
const { errorHandler } = require('./utils/errorHandler');
const { generalLimiter, authLimiter, heavyApiLimiter } = require('../config/limiter.config');

// routes
const authRoutes = require('./routes/auth');
const schoolRoutes = require('./routes/school');
const submissionRoutes = require('./routes/submission');
const districtRoutes = require('./routes/district');
const csrRoutes = require('./routes/csr');
const analyticsRoutes = require('./routes/analytics');
const aiRoutes = require('./routes/ai');
const notificationRoutes = require('./routes/notification');
const accountRoutes = require('./routes/account');
const predictionRoutes = require('./routes/predictions');

// Inisialisasi Express app
const app = express();
const HOST = process.env.HOST || 'localhost';
const PORT = parseInt(process.env.PORT) || 3000;

connectDB();

app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(cors());
app.use(sanitize.clean(
  {
    xss: true,
    sql: true,
    sanitizeKeys: true
  },
  [
    "body",
    "query"
  ],
))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api', generalLimiter);

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/ai', heavyApiLimiter, aiRoutes);
app.use('/api/analytics', heavyApiLimiter, analyticsRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/csr', csrRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/predictions', predictionRoutes);

app.use(errorHandler);

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});