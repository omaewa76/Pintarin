// config/jwt.config.js

require('dotenv').config();

module.exports = {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY,
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '7d',
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '30d',
    saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
    randomLength: parseInt(process.env.RANDOM_LENGTH) || 32
};