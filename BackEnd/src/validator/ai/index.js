const InvariantError = require('../../exceptions/InvariantError');
const {
    predictRiskSchema,
    batchPredictSchema,
    getInsightsSchema,
    trainModelSchema
} = require('./schema');

const AIValidator = {
    validatePredictRisk: (payload) => {
        const result = predictRiskSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateBatchPredict: (payload) => {
        const result = batchPredictSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateGetInsights: (query) => {
        const result = getInsightsSchema.validate(query);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateTrainModel: (payload) => {
        const result = trainModelSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    }
};

module.exports = AIValidator;