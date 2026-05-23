// src/validator/district/index.js

const InvariantError = require('../../exceptions/InvariantError');
const {
    districtQuerySchema,
    districtIdSchema,
    createDistrictSchema,
    updateDistrictSchema
} = require('./schema');

const DistrictValidator = {
    validateDistrictQuery: (query) => {
        const result = districtQuerySchema.validate(query);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateDistrictId: (params) => {
        const result = districtIdSchema.validate(params);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateCreateDistrict: (payload) => {
        const result = createDistrictSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateUpdateDistrict: (payload) => {
        const result = updateDistrictSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    }
};

module.exports = DistrictValidator;