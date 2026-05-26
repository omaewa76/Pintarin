// src/routes/prediction.js

const express = require('express');
const { authenticate } = require('../middleware/auth');
const { guardDinas } = require('../middleware/roleGuard');
const {
    getPendingReview,
    validatePrediction,
    getValidationHistory,
    getValidationStats,
    getLatestPredictions,
} = require('../controllers/prediction');

const router = express.Router();

// Dinas melihat prediksi terbaru untuk semua kecamatan
router.get('/latest', 
    authenticate, 
    getLatestPredictions
);

// Dinas melihat prediksi yang menunggu review
router.get('/pending-review', 
    authenticate, 
    guardDinas, 
    getPendingReview
);

// Dinas memvalidasi prediksi (approve/reject)
router.post('/:id/validate', 
    authenticate, 
    guardDinas, 
    validatePrediction
);

// Dinas melihat history validasi untuk suatu kecamatan
router.get('/:id/validation-history', 
    authenticate, 
    guardDinas, 
    getValidationHistory
);

// Dinas melihat statistik validasi (jumlah approve/reject, akurasi, dll)
router.get('/stats/validation', 
    authenticate, 
    guardDinas, 
    getValidationStats
);

module.exports = router;