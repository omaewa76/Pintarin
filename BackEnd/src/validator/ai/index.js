// src/validator/ai/index.js

const InvariantError = require('../../exceptions/InvariantError');
const {
    predictRiskSchema,
    batchPredictSchema,
    getInsightsSchema,
    trainModelSchema
} = require('./schema');

// Validator untuk validasi data yang masuk terkait operasi pada fitur AI, termasuk validasi payload untuk prediksi risiko, prediksi batch, pengambilan insights, dan pelatihan model, dengan memastikan bahwa data yang diterima sesuai dengan aturan yang telah ditetapkan dan memberikan gambaran lengkap tentang profil operasi AI yang sedang dikelola
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