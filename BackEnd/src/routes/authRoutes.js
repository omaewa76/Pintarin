// src/routes/authRoutes.js
const express = require('express');
const {
    login,
    logout,
    refreshToken,
    getMe,
    changePassword,
    forgotPassword,
    resetPassword
} = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const validationAdapter = require('../middleware/validationAdapter');
const AuthValidator = require('../validator/auth');
const { authLimiter, resetPasswordLimiter } = require('../../config/limiter.config');

const router = express.Router();

// Login
router.post('/login',
    authLimiter,
    validationAdapter(AuthValidator.validateLogin, 'body'),
    login
);

// Logout
router.post('/logout',
    authenticate,
    logout
);

// Refresh token
router.post('/refresh-token',
    validationAdapter(AuthValidator.validateRefreshToken, 'body'),
    refreshToken
);

// Me
router.get('/me',
    authenticate,
    getMe
);

// Change password
router.post('/change-password',
    authenticate,
    validationAdapter(AuthValidator.validateChangePassword, 'body'),
    changePassword
);

// Forgot password
router.post('/forgot-password',
    resetPasswordLimiter,
    validationAdapter(AuthValidator.validateForgotPassword, 'body'),
    forgotPassword
);

// Reset password
router.post('/reset-password',
    resetPasswordLimiter,
    validationAdapter(AuthValidator.validateResetPassword, 'body'),
    resetPassword
);

module.exports = router;