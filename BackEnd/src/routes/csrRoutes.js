// src/routes/csrRoutes.js
const express = require('express');
const {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany,
    getAllAssistanceRequests,
    getAssistanceRequestById,
    createAssistanceRequest,
    approveAssistanceRequest,
    rejectAssistanceRequest,
    completeAssistanceRequest
} = require('../controllers/csrController');
const { authenticate } = require('../middleware/auth');
const { requireDinas, requireCSR } = require('../middleware/roleCheck');
const validationAdapter = require('../middleware/validationAdapter');
const CSRValidator = require('../validator/csr');

const router = express.Router();

// COMPANY ROUTES
// List perusahaan CSR
router.get('/companies',
    authenticate,
    validationAdapter(CSRValidator.validateCompanyQuery, 'query'),
    getAllCompanies
);

// Detail perusahaan CSR
router.get('/companies/:id',
    authenticate,
    validationAdapter(CSRValidator.validateCompanyId, 'params'),
    getCompanyById
);

// Create perusahaan CSR (Dinas only)
router.post('/companies',
    authenticate,
    requireDinas,
    validationAdapter(CSRValidator.validateCreateCompany, 'body'),
    createCompany
);

// Update perusahaan CSR (Dinas only)
router.put('/companies/:id',
    authenticate,
    requireDinas,
    validationAdapter(CSRValidator.validateUpdateCompany, 'body'),
    updateCompany
);

// Delete perusahaan CSR (Dinas only)
router.delete('/companies/:id',
    authenticate,
    requireDinas,
    validationAdapter(CSRValidator.validateCompanyId, 'params'),
    deleteCompany
);

// ASSISTANCE ROUTES
// List pengajuan bantuan
router.get('/assistance',
    authenticate,
    validationAdapter(CSRValidator.validateAssistanceQuery, 'query'),
    getAllAssistanceRequests
);

// Detail pengajuan bantuan
router.get('/assistance/:id',
    authenticate,
    validationAdapter(CSRValidator.validateAssistanceId, 'params'),
    getAssistanceRequestById
);

// Buat pengajuan bantuan baru (CSR only)
router.post('/assistance',
    authenticate,
    requireCSR,
    validationAdapter(CSRValidator.validateCreateAssistance, 'body'),
    createAssistanceRequest
);

// Approve pengajuan (Dinas only)
router.patch('/assistance/:id/approve',
    authenticate,
    requireDinas,
    validationAdapter(CSRValidator.validateApproveAssistance, 'params'),
    approveAssistanceRequest
);

// Reject pengajuan (Dinas only)
router.patch('/assistance/:id/reject',
    authenticate,
    requireDinas,
    validationAdapter(CSRValidator.validateRejectAssistance, 'combined'),
    rejectAssistanceRequest
);

// Complete pengajuan (CSR/Dinas)
router.patch('/assistance/:id/complete',
    authenticate,
    validationAdapter(CSRValidator.validateCompleteAssistance, 'combined'),
    completeAssistanceRequest
);

module.exports = router;