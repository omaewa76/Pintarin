const InvariantError = require('../../exceptions/InvariantError');
const {
    accountQuerySchema,
    accountIdSchema,
    createAccountSchema,
    updateAccountSchema,
    suspendAccountSchema,
    activateAccountSchema
} = require('./schema');

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