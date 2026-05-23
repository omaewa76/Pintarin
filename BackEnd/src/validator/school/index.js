// src/validator/school/index.js

const InvariantError = require('../../exceptions/InvariantError');
const {
    schoolQuerySchema,
    schoolIdSchema,
    verifySchoolSchema,
    riskHistorySchema,
    createSchoolSchema,
    updateSchoolSchema
} = require('./schema');

const SchoolValidator = {
    validateSchoolQuery: (query) => {
        const result = schoolQuerySchema.validate(query);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateSchoolId: (params) => {
        const result = schoolIdSchema.validate(params);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateVerifySchool: (params) => {
        const result = verifySchoolSchema.validate(params);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateRiskHistory: (params) => {
        const result = riskHistorySchema.validate(params);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateCreateSchool: (payload) => {
        const result = createSchoolSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateUpdateSchool: (payload) => {
        const result = updateSchoolSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    }
};

module.exports = SchoolValidator;