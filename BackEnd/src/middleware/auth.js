// src/middleware/auth.js

const TokenManager = require('../tokenize/TokenManager');
const { responseError } = require('../utils/errorHandler');

// Middleware untuk memverifikasi token JWT dan mengautentikasi pengguna
const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return responseError(res, 'Token tidak ditemukan', 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = TokenManager.verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.message === 'Token expired') {
            return responseError(res, 'Token sudah kadaluarsa', 401);
        }
        if (error.message === 'Token has been revoked') {
            return responseError(res, 'Token sudah tidak berlaku', 401);
        }
        return responseError(res, 'Token tidak valid', 401);
    }
};

const optionalAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            req.user = TokenManager.verifyAccessToken(token);
        } catch (error) { }
    }
    next();
};

module.exports = { authenticate, optionalAuth };