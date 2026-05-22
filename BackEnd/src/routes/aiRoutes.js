// src/routes/aiRoutes.js
const express = require('express');
const {
    predictRisk,
    batchPredict,
    getInsights,
    trainModel
} = require('../controllers/aiController');
const { authenticate } = require('../middleware/auth');
const { requireDinas } = require('../middleware/roleCheck');
const validationAdapter = require('../middleware/validationAdapter');
const AIValidator = require('../validator/ai');

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

// Training ulang model AI (opsional)
router.post('/train',
    authenticate,
    requireDinas,
    validationAdapter(AIValidator.validateTrainModel, 'body'),
    trainModel
);

module.exports = router;