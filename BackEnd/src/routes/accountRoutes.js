// src/routes/accountRoutes.js
const express = require('express');
const {
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    suspendAccount,
    activateAccount,
    deleteAccount
} = require('../controllers/accountController');
const { authenticate } = require('../middleware/auth');
const { requireDinas } = require('../middleware/roleCheck');
const validationAdapter = require('../middleware/validationAdapter');
const AccountValidator = require('../validator/account');

const router = express.Router();

// List semua user (Dinas only)
router.get('/',
    authenticate,
    requireDinas,
    validationAdapter(AccountValidator.validateAccountQuery, 'query'),
    getAllAccounts
);

// Detail user
router.get('/:id',
    authenticate,
    validationAdapter(AccountValidator.validateAccountId, 'params'),
    getAccountById
);

// Create user baru (Dinas only)
router.post('/',
    authenticate,
    requireDinas,
    validationAdapter(AccountValidator.validateCreateAccount, 'body'),
    createAccount
);

// Update user
router.put('/:id',
    authenticate,
    validationAdapter(AccountValidator.validateUpdateAccount, 'body'),
    updateAccount
);

// Suspend akun (Dinas only)
router.patch('/:id/suspend',
    authenticate,
    requireDinas,
    validationAdapter(AccountValidator.validateAccountId, 'params'),
    suspendAccount
);

// Aktivasi akun (Dinas only)
router.patch('/:id/activate',
    authenticate,
    requireDinas,
    validationAdapter(AccountValidator.validateAccountId, 'params'),
    activateAccount
);

// Hapus akun (Dinas only)
router.delete('/:id',
    authenticate,
    requireDinas,
    validationAdapter(AccountValidator.validateAccountId, 'params'),
    deleteAccount
);

module.exports = router;