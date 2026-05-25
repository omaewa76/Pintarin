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

router.get('/latest', 
    authenticate, 
    getLatestPredictions
);

router.get('/pending-review', 
    authenticate, 
    guardDinas, 
    getPendingReview
);

router.post('/:id/validate', 
    authenticate, 
    guardDinas, 
    validatePrediction
);

router.get('/:id/validation-history', 
    authenticate, 
    guardDinas, 
    getValidationHistory
);

router.get('/stats/validation', 
    authenticate, 
    guardDinas, 
    getValidationStats
);

module.exports = router;