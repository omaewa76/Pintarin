const rateLimit = require('express-rate-limit');

const defaultConfig = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Terlalu banyak permintaan. Silakan coba lagi nanti.',
    timestamp: new Date().toISOString()
  },
  standardHeaders: true,
  legacyHeaders: false
};

const generalLimiter = rateLimit(defaultConfig);

const authLimiter = rateLimit({
  ...defaultConfig,
  windowMs: 15 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Terlalu banyak percobaan login. Coba lagi setelah 15 menit.',
    timestamp: new Date().toISOString()
  }
});

const resetPasswordLimiter = rateLimit({
  ...defaultConfig,
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: 'Terlalu banyak permintaan reset password. Coba lagi setelah 1 jam.',
    timestamp: new Date().toISOString()
  }
});

const heavyApiLimiter = rateLimit({
  ...defaultConfig,
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: 'Batas permintaan tercapai. Coba lagi nanti.',
    timestamp: new Date().toISOString()
  }
});

const aiLimiter = rateLimit({
  ...defaultConfig,
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Batas permintaan AI tercapai. Coba lagi nanti.',
    timestamp: new Date().toISOString()
  }
});

const analyticsLimiter = rateLimit({
  ...defaultConfig,
  windowMs: 5 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: 'Terlalu banyak permintaan data. Coba lagi setelah 5 menit.',
    timestamp: new Date().toISOString()
  }
});

const crudLimiter = rateLimit({
  ...defaultConfig,
  windowMs: 1 * 60 * 1000,
  max: 60,
  message: {
    success: false,
    message: 'Terlalu banyak permintaan. Coba lagi setelah 1 menit.',
    timestamp: new Date().toISOString()
  }
});

const publicLimiter = rateLimit({
  ...defaultConfig,
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: 'Terlalu banyak permintaan dari IP Anda. Coba lagi nanti.',
    timestamp: new Date().toISOString()
  }
});

const uploadLimiter = rateLimit({
  ...defaultConfig,
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: {
    success: false,
    message: 'Batas upload tercapai. Coba lagi nanti.',
    timestamp: new Date().toISOString()
  }
});

const createCustomLimiter = (windowMs, max, message = null) => {
  return rateLimit({
    ...defaultConfig,
    windowMs,
    max,
    message: message || {
      success: false,
      message: `Maksimal ${max} permintaan per ${windowMs / 1000} detik.`,
      timestamp: new Date().toISOString()
    }
  });
};

const roleBasedLimiter = (req, res, next) => {
  const role = req.user?.role;
  let limit = 100;
  
  if (role === 'dinas') limit = 200;
  else if (role === 'csr') limit = 150;
  else if (role === 'sekolah') limit = 100;
  
  const limiter = rateLimit({
    ...defaultConfig,
    max: limit,
    keyGenerator: (req) => req.user?.id || req.ip,
    message: {
      success: false,
      message: `Batas request untuk ${role} telah tercapai (${limit} request per 15 menit).`,
      timestamp: new Date().toISOString()
    }
  });
  
  return limiter(req, res, next);
};

module.exports = {
  generalLimiter,
  authLimiter,
  resetPasswordLimiter,
  heavyApiLimiter,
  aiLimiter,
  analyticsLimiter,
  crudLimiter,
  publicLimiter,
  uploadLimiter,
  createCustomLimiter,
  roleBasedLimiter
};