// src/tokenize/TokenManager.js

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const jwtConfig = require('../../config/jwt.config');

class TokenManager {
    constructor() {
        this.accessTokenKey = jwtConfig.accessTokenKey;
        this.refreshTokenKey = jwtConfig.refreshTokenKey;
        this.accessTokenExpiry = jwtConfig.accessTokenExpiry;
        this.refreshTokenExpiry = jwtConfig.refreshTokenExpiry;
        this.randomLength = jwtConfig.randomLength;
        this.blacklistedTokens = new Set();
    }

    // Membuat access token
    generateAccessToken(payload) {
        return jwt.sign(payload, this.accessTokenKey, {
            expiresIn: this.accessTokenExpiry,
            issuer: 'school-csr-app',
            audience: 'school-csr-client'
        });
    }

    // Membuat refresh token
    generateRefreshToken(payload) {
        const refreshPayload = {
            ...payload,
            type: 'refresh',
            fingerprint: crypto.randomBytes(this.randomLength).toString('hex')
        };

        return jwt.sign(refreshPayload, this.refreshTokenKey, {
            expiresIn: this.refreshTokenExpiry,
            issuer: 'school-csr-app',
            audience: 'school-csr-client'
        });
    }

    // Membuat pair token
    generateTokenPair(user) {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.peran,
            school_id: user.sekolah_id,
            csr_company_id: user.perusahaan_csr_id
        };

        const accessToken = this.generateAccessToken(payload);
        const refreshToken = this.generateRefreshToken(payload);

        return {
            accessToken,
            refreshToken,
            expiresIn: this.getExpiryInSeconds(this.accessTokenExpiry)
        };
    }

    // Verifikasi access token
    verifyAccessToken(token) {
        try {
            const decoded = jwt.verify(token, this.accessTokenKey, {
                issuer: 'school-csr-app',
                audience: 'school-csr-client'
            });

            if (this.isBlacklisted(token)) {
                throw new Error('Token has been revoked');
            }

            return decoded;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Token expired');
            }
            if (error.name === 'JsonWebTokenError') {
                throw new Error('Invalid token');
            }
            throw error;
        }
    }

    // Verifikasi refresh token
    verifyRefreshToken(token) {
        try {
            const decoded = jwt.verify(token, this.refreshTokenKey, {
                issuer: 'school-csr-app',
                audience: 'school-csr-client'
            });

            if (decoded.type !== 'refresh') {
                throw new Error('Invalid refresh token type');
            }

            if (this.isBlacklisted(token)) {
                throw new Error('Token has been revoked');
            }

            return decoded;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Refresh token expired');
            }
            if (error.name === 'JsonWebTokenError') {
                throw new Error('Invalid refresh token');
            }
            throw error;
        }
    }

    // Refresh access token
    refreshAccessToken(refreshToken) {
        try {
            const decoded = this.verifyRefreshToken(refreshToken);

            const newPayload = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
                school_id: decoded.school_id,
                csr_company_id: decoded.csr_company_id
            };

            const newAccessToken = this.generateAccessToken(newPayload);

            return {
                accessToken: newAccessToken,
                expiresIn: this.getExpiryInSeconds(this.accessTokenExpiry)
            };
        } catch (error) {
            throw new Error('Unable to refresh token: ' + error.message);
        }
    }

    // Blacklist token
    blacklistToken(token, tokenType = 'access') {
        try {
            // const secretKey = tokenType === 'access' ? this.accessTokenKey : this.refreshTokenKey;
            const decoded = jwt.decode(token);

            if (decoded && decoded.exp) {
                const ttl = (decoded.exp * 1000) - Date.now();
                if (ttl > 0) {
                    this.blacklistedTokens.add(token);

                    setTimeout(() => {
                        this.blacklistedTokens.delete(token);
                    }, ttl);
                }
            } else {
                this.blacklistedTokens.add(token);
            }
            return true;
        } catch (error) {
            console.error('Error blacklisting token:', error);
            return false;
        }
    }

    // Cek blacklist
    isBlacklisted(token) {
        return this.blacklistedTokens.has(token);
    }

    // Decode token
    decodeToken(token) {
        return jwt.decode(token);
    }

    // Get expiry remaining
    getTokenExpiryRemaining(token) {
        try {
            const decoded = jwt.decode(token);
            if (decoded && decoded.exp) {
                const remaining = (decoded.exp * 1000) - Date.now();
                return Math.max(0, Math.floor(remaining / 1000));
            }
            return 0;
        } catch (error) {
            return 0;
        }
    }

    // Konversi expiry string ke detik
    getExpiryInSeconds(expiryString) {
        const match = expiryString.match(/^(\d+)([smhdw])$/);
        if (!match) return 7 * 24 * 60 * 60;

        const value = parseInt(match[1]);
        const unit = match[2];

        const multipliers = {
            's': 1,
            'm': 60,
            'h': 60 * 60,
            'd': 24 * 60 * 60,
            'w': 7 * 24 * 60 * 60
        };

        return value * (multipliers[unit] || 1);
    }

    // Generate password reset token
    generatePasswordResetToken(userId, email) {
        const payload = {
            user_id: userId,
            email: email,
            type: 'password_reset',
            fingerprint: crypto.randomBytes(16).toString('hex')
        };

        return jwt.sign(payload, this.accessTokenKey, {
            expiresIn: '1h',
            issuer: 'school-csr-app',
            audience: 'school-csr-client'
        });
    }

    // Verify password reset token
    verifyPasswordResetToken(token) {
        try {
            const decoded = jwt.verify(token, this.accessTokenKey, {
                issuer: 'school-csr-app',
                audience: 'school-csr-client'
            });

            if (decoded.type !== 'password_reset') {
                throw new Error('Invalid token type');
            }

            return decoded;
        } catch (error) {
            throw new Error('Invalid or expired reset token');
        }
    }

    // Generate email verification token
    generateEmailVerificationToken(userId, email) {
        const payload = {
            user_id: userId,
            email: email,
            type: 'email_verification',
            fingerprint: crypto.randomBytes(this.randomLength).toString('hex')
        };

        return jwt.sign(payload, this.accessTokenKey, {
            expiresIn: '7d',
            issuer: 'school-csr-app',
            audience: 'school-csr-client'
        });
    }

    // Verify email verification token
    verifyEmailVerificationToken(token) {
        try {
            const decoded = jwt.verify(token, this.accessTokenKey, {
                issuer: 'school-csr-app',
                audience: 'school-csr-client'
            });

            if (decoded.type !== 'email_verification') {
                throw new Error('Invalid token type');
            }

            return decoded;
        } catch (error) {
            throw new Error('Invalid or expired verification token');
        }
    }
}

module.exports = new TokenManager();