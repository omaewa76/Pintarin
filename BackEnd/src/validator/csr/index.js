const InvariantError = require('../../exceptions/InvariantError');
const {
    companyQuerySchema,
    companyIdSchema,
    createCompanySchema,
    updateCompanySchema,
    assistanceQuerySchema,
    assistanceIdSchema,
    createAssistanceSchema,
    approveAssistanceSchema,
    rejectAssistanceSchema,
    completeAssistanceSchema
} = require('./schema');

const CSRValidator = {
    // Company validators
    validateCompanyQuery: (query) => {
        const result = companyQuerySchema.validate(query);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateCompanyId: (params) => {
        const result = companyIdSchema.validate(params);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateCreateCompany: (payload) => {
        const result = createCompanySchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateUpdateCompany: (payload) => {
        const result = updateCompanySchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    // Assistance validators
    validateAssistanceQuery: (query) => {
        const result = assistanceQuerySchema.validate(query);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateAssistanceId: (params) => {
        const result = assistanceIdSchema.validate(params);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateCreateAssistance: (payload) => {
        const result = createAssistanceSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateApproveAssistance: (params) => {
        const result = approveAssistanceSchema.validate(params);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateRejectAssistance: (params, body) => {
        const combined = { ...params, ...body };
        const result = rejectAssistanceSchema.validate(combined);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateCompleteAssistance: (params, body) => {
        const combined = { ...params, ...body };
        const result = completeAssistanceSchema.validate(combined);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    }
};

module.exports = CSRValidator;