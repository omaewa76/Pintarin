// config/auth.js

require('dotenv').config();
const bcrypt = require('bcrypt');
const TokenManager = require('../tokenize/TokenManager');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

const generateRandomString = (length = parseInt(process.env.RANDOM_LENGTH) || 32) => {
    const crypto = require('crypto');
    return crypto.randomBytes(length).toString('hex');
};

const generateToken = (user) => {
    return TokenManager.generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.peran,
        school_id: user.sekolah_id,
        csr_company_id: user.perusahaan_csr_id
    });
};

const generateTokenPair = (user) => {
    return TokenManager.generateTokenPair(user);
};

const verifyToken = (token) => {
    return TokenManager.verifyAccessToken(token);
};

const verifyRefreshToken = (token) => {
    return TokenManager.verifyRefreshToken(token);
};

const decodeToken = (token) => {
    return TokenManager.decodeToken(token);
};

const blacklistToken = (token, tokenType = 'access') => {
    return TokenManager.blacklistToken(token, tokenType);
};

const refreshAccessToken = (refreshToken) => {
    return TokenManager.refreshAccessToken(refreshToken);
};

module.exports = {
    hashPassword,
    comparePassword,
    generateRandomString,
    generateToken,
    generateTokenPair,
    verifyToken,
    verifyRefreshToken,
    decodeToken,
    blacklistToken,
    refreshAccessToken,
    SALT_ROUNDS
};