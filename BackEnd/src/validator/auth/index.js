// src/validator/auth/index.js

const InvariantError = require('../../exceptions/InvariantError');
const {
    loginSchema,
    refreshTokenSchema,
    changePasswordSchema,
    forgotPasswordSchema,
    resetPasswordSchema
} = require('./schema');

// Validasi Auth
const AuthValidator = {
    validateLogin: (payload) => {
        const result = loginSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateRefreshToken: (payload) => {
        const result = refreshTokenSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateChangePassword: (payload) => {
        const result = changePasswordSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateForgotPassword: (payload) => {
        const result = forgotPasswordSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateResetPassword: (payload) => {
        const result = resetPasswordSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    }
};

module.exports = AuthValidator;