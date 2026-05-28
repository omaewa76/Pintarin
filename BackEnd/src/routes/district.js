// src/routes/districtRoutes.js
const express = require('express');
const {
    getAllDistricts,
    getDistrictById,
    getDistrictRiskHistory,
    getDistrictRanking
} = require('../controllers/district');
const { authenticate } = require('../middleware/auth');
const validationAdapter = require('../middleware/validationAdapter');
const DistrictValidator = require('../validator/district/index');

const router = express.Router();

// List kecamatan + risk score terbaru
router.get('/',
    authenticate,
    validationAdapter(DistrictValidator.validateDistrictQuery, 'query'),
    getAllDistricts
);

// Ranking kecamatan berdasarkan risk score
router.get('/ranking',
    authenticate,
    getDistrictRanking
);

// Detail kecamatan + sekolah di dalamnya
router.get('/:id',
    authenticate,
    validationAdapter(DistrictValidator.validateDistrictId, 'params'),
    getDistrictById
);

// History risk score kecamatan
router.get('/:id/risk-history',
    authenticate,
    validationAdapter(DistrictValidator.validateDistrictId, 'params'),
    getDistrictRiskHistory
);

module.exports = router;