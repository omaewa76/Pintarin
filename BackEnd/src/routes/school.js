// src/routes/schoolRoutes.js
const express = require('express');
const {
    getAllSchools,
    getSchoolById,
    createSchool,
    updateSchool,
    deleteSchool,
    verifySchool,
    getSchoolRiskHistory
} = require('../controllers/school');
const { authenticate } = require('../middleware/auth');
const { requireDinas } = require('../middleware/roleCheck');
const validationAdapter = require('../middleware/validationAdapter');
const SchoolValidator = require('../validator/school/index');

const router = express.Router();

// List semua sekolah
router.get('/',
    authenticate,
    validationAdapter(SchoolValidator.validateSchoolQuery, 'query'),
    getAllSchools
);

// Detail sekolah
router.get('/:id',
    authenticate,
    validationAdapter(SchoolValidator.validateSchoolId, 'params'),
    getSchoolById
);

// Create sekolah (Dinas only)
router.post('/',
    authenticate,
    requireDinas,
    validationAdapter(SchoolValidator.validateCreateSchool, 'body'),
    createSchool
);

// Update sekolah (Dinas only)
router.put('/:id',
    authenticate,
    requireDinas,
    validationAdapter(SchoolValidator.validateUpdateSchool, 'body'),
    updateSchool
);

// Delete sekolah (Dinas only)
router.delete('/:id',
    authenticate,
    requireDinas,
    validationAdapter(SchoolValidator.validateSchoolId, 'params'),
    deleteSchool
);

// Verifikasi sekolah (Dinas only)
router.patch('/:id/verify',
    authenticate,
    requireDinas,
    validationAdapter(SchoolValidator.validateVerifySchool, 'params'),
    verifySchool
);

// History risk score
router.get('/:id/risk-history',
    authenticate,
    validationAdapter(SchoolValidator.validateRiskHistory, 'combined'),
    getSchoolRiskHistory
);

module.exports = router;