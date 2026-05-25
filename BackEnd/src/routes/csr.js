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
    completeAssistanceRequest,
    matchDistricts,
    getMatchHistory
} = require('../controllers/csr');
const { authenticate } = require('../middleware/auth');
const { requireDinas, requireCSR } = require('../middleware/roleCheck');
const validationAdapter = require('../middleware/validationAdapter');
const CSRValidator = require('../validator/csr/index');

const router = express.Router();

// Endpoint untuk mendapatkan daftar perusahaan
router.get('/companies',
    authenticate,
    validationAdapter(CSRValidator.validateCompanyQuery, 'query'),
    getAllCompanies
);

// Endpoint untuk mendapatkan detail perusahaan berdasarkan ID
router.get('/companies/:id',
    authenticate,
    validationAdapter(CSRValidator.validateCompanyId, 'params'),
    getCompanyById
);

// Endpoint untuk membuat perusahaan baru (hanya untuk Dinas)
router.post('/companies',
    authenticate,
    requireDinas,
    validationAdapter(CSRValidator.validateCreateCompany, 'body'),
    createCompany
);

// Endpoint untuk mengupdate data perusahaan (hanya untuk Dinas)
router.put('/companies/:id',
    authenticate,
    requireDinas,
    validationAdapter(CSRValidator.validateUpdateCompany, 'body'),
    updateCompany
);

// Endpoint untuk menghapus perusahaan (hanya untuk Dinas)
router.delete('/companies/:id',
    authenticate,
    requireDinas,
    validationAdapter(CSRValidator.validateCompanyId, 'params'),
    deleteCompany
);

// Endpoints untuk pengajuan bantuan CSR
router.get('/assistance',
    authenticate,
    validationAdapter(CSRValidator.validateAssistanceQuery, 'query'),
    getAllAssistanceRequests
);

// Endpoint untuk mendapatkan detail pengajuan bantuan berdasarkan ID
router.get('/assistance/:id',
    authenticate,
    validationAdapter(CSRValidator.validateAssistanceId, 'params'),
    getAssistanceRequestById
);

// Endpoint untuk membuat pengajuan bantuan (hanya untuk CSR)
router.post('/assistance',
    authenticate,
    requireCSR,
    validationAdapter(CSRValidator.validateCreateAssistance, 'body'),
    createAssistanceRequest
);

// Endpoint untuk menyetujui pengajuan bantuan (hanya untuk Dinas)
router.patch('/assistance/:id/approve',
    authenticate,
    requireDinas,
    validationAdapter(CSRValidator.validateApproveAssistance, 'params'),
    approveAssistanceRequest
);

// Endpoint untuk menolak pengajuan bantuan (hanya untuk Dinas)
router.patch('/assistance/:id/reject',
    authenticate,
    requireDinas,
    validationAdapter(CSRValidator.validateRejectAssistance, 'combined'),
    rejectAssistanceRequest
);

// Endpoint untuk menandai bantuan sebagai selesai (hanya untuk Dinas)
router.patch('/assistance/:id/complete',
    authenticate,
    validationAdapter(CSRValidator.validateCompleteAssistance, 'combined'),
    completeAssistanceRequest
);

// Endpoint untuk mencocokkan kecamatan berdasarkan data sekolah yang diajukan (hanya untuk Dinas)
router.post('/match',
    authenticate,
    matchDistricts
);

// History pencocokan kecamatan untuk pengajuan bantuan
router.get('/match-history',
    authenticate,
    getMatchHistory
);

module.exports = router;