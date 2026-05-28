// src/validator/account/index.js

const InvariantError = require('../../exceptions/InvariantError');
const {
    accountQuerySchema,
    accountIdSchema,
    createAccountSchema,
    updateAccountSchema,
    suspendAccountSchema,
    activateAccountSchema
} = require('./schema');

// Validator untuk validasi data yang masuk terkait operasi pada akun pengguna, termasuk validasi query parameters untuk pengambilan data akun, validasi parameter ID untuk operasi spesifik pada akun tertentu, serta validasi payload untuk pembuatan, pembaruan, penangguhan, dan pengaktifan akun, dengan memastikan bahwa data yang diterima sesuai dengan aturan yang telah ditetapkan dan memberikan gambaran lengkap tentang profil akun yang sedang dikelola
const AccountValidator = {
    validateAccountQuery: (query) => {
        const result = accountQuerySchema.validate(query);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateAccountId: (params) => {
        const result = accountIdSchema.validate(params);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateCreateAccount: (payload) => {
        const result = createAccountSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateUpdateAccount: (payload) => {
        const result = updateAccountSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateSuspendAccount: (params, body) => {
        const combined = { ...params, ...body };
        const result = suspendAccountSchema.validate(combined);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateActivateAccount: (params) => {
        const result = activateAccountSchema.validate(params);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    }
};

module.exports = AccountValidator;