// src/validator/analytics/index.js

const InvariantError = require('../../exceptions/InvariantError');
const {
    overviewSchema,
    riskTrendSchema,
    districtRankingSchema,
    assistanceSummarySchema,
    schoolComparisonSchema
} = require('./schema');

// Validator untuk validasi data yang masuk terkait operasi pada fitur analitik, termasuk validasi query parameters untuk pengambilan data overview, tren risiko, peringkat kecamatan, ringkasan bantuan, serta validasi payload untuk perbandingan sekolah, dengan memastikan bahwa data yang diterima sesuai dengan aturan yang telah ditetapkan dan memberikan gambaran lengkap tentang profil operasi analitik yang sedang dikelola
const AnalyticsValidator = {
    validateOverview: (query) => {
        const result = overviewSchema.validate(query);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateRiskTrend: (query) => {
        const result = riskTrendSchema.validate(query);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateDistrictRanking: (query) => {
        const result = districtRankingSchema.validate(query);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateAssistanceSummary: (query) => {
        const result = assistanceSummarySchema.validate(query);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateSchoolComparison: (payload) => {
        const result = schoolComparisonSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    }
};

module.exports = AnalyticsValidator;