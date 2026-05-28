// src/routes/submissionRoutes.js
const express = require('express');
const {
    getAllSubmissions,
    getSubmissionById,
    createSubmission,
    approveSubmission,
    rejectSubmission
} = require('../controllers/submission');
const { authenticate } = require('../middleware/auth');
const { requireDinas, requireSchool } = require('../middleware/roleCheck');
const validationAdapter = require('../middleware/validationAdapter');
const SubmissionValidator = require('../validator/submission/index');

const router = express.Router();

// List submission
router.get('/',
    authenticate,
    validationAdapter(SubmissionValidator.validateSubmissionQuery, 'query'),
    getAllSubmissions
);

// Detail submission
router.get('/:id',
    authenticate,
    validationAdapter(SubmissionValidator.validateSubmissionId, 'params'),
    getSubmissionById
);

// Sekolah submit data baru
router.post('/',
    authenticate,
    requireSchool,
    validationAdapter(SubmissionValidator.validateCreateSubmission, 'body'),
    createSubmission
);

// Dinas approve
router.patch('/:id/approve',
    authenticate,
    requireDinas,
    validationAdapter(SubmissionValidator.validateApproveSubmission, 'params'),
    approveSubmission
);

// Dinas reject
router.patch('/:id/reject',
    authenticate,
    requireDinas,
    validationAdapter(SubmissionValidator.validateRejectSubmission, 'combined'),
    rejectSubmission
);

module.exports = router;