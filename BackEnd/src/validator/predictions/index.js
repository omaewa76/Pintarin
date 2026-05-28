// src/validator/prediction/index.js

const InvariantError = require('../../exceptions/InvariantError');
const {
    predictionValidationSchema,
    predictionIdSchema,
    predictionQuerySchema
} = require('./schema');

// Validasi Prediksi
const PredictionValidator = {
    validateValidation: (payload) => {
        const result = predictionValidationSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateId: (params) => {
        const result = predictionIdSchema.validate(params);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateQuery: (query) => {
        const result = predictionQuerySchema.validate(query);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    }
};

module.exports = PredictionValidator;