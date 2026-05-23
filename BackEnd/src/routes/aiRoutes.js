// src/routes/aiRoutes.js
const express = require('express');
const {
    predictRisk,
    batchPredict,
    getInsights
} = require('../controllers/aiController');
const { authenticate } = require('../middleware/auth');
const { requireDinas } = require('../middleware/roleCheck');
const validationAdapter = require('../middleware/validationAdapter');
const AIValidator = require('../validator/ai/index');

const router = express.Router();

// Pediksi risiko satu sekolah
router.post('/predict-risk',
    authenticate,
    requireDinas,
    validationAdapter(AIValidator.validatePredictRisk, 'body'),
    predictRisk
);

// Prediksi semua sekolah (batch)
router.post('/batch-predict',
    authenticate,
    requireDinas,
    validationAdapter(AIValidator.validateBatchPredict, 'body'),
    batchPredict
);

// AI-generated insights untuk dashboard
router.get('/insights',
    authenticate,
    requireDinas,
    validationAdapter(AIValidator.validateGetInsights, 'query'),
    getInsights
);

module.exports = router;