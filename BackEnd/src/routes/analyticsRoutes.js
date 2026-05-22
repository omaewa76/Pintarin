// src/routes/analyticsRoutes.js
const express = require('express');
const {
    getOverview,
    getRiskTrend,
    getDistrictRanking,
    getAssistanceSummary,
    getSchoolComparison
} = require('../controllers/analyticsController');
const { authenticate } = require('../middleware/auth');
const { requireDinas } = require('../middleware/roleCheck');
const validationAdapter = require('../middleware/validationAdapter');
const AnalyticsValidator = require('../validator/analytics');

const router = express.Router();

// Stats ringkasan
router.get('/overview',
    authenticate,
    requireDinas,
    validationAdapter(AnalyticsValidator.validateOverview, 'query'),
    getOverview
);

// Tren risk score per bulan
router.get('/risk-trend',
    authenticate,
    requireDinas,
    validationAdapter(AnalyticsValidator.validateRiskTrend, 'query'),
    getRiskTrend
);

// Ranking kecamatan
router.get('/district-ranking',
    authenticate,
    requireDinas,
    validationAdapter(AnalyticsValidator.validateDistrictRanking, 'query'),
    getDistrictRanking
);

// Ringkasan bantuan
router.get('/assistance-summary',
    authenticate,
    requireDinas,
    validationAdapter(AnalyticsValidator.validateAssistanceSummary, 'query'),
    getAssistanceSummary
);

// Perbandingan antar sekolah
router.post('/school-comparison',
    authenticate,
    requireDinas,
    validationAdapter(AnalyticsValidator.validateSchoolComparison, 'body'),
    getSchoolComparison
);

module.exports = router;