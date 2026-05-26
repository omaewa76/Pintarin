// src/controllers/district.js

const { responseSuccess, responseError, asyncHandler } = require('../utils/errorHandler');
const { DistrictService, DistrictRiskService } = require('../services/postgres');
const DistrictValidator = require('../validator/district/index');

// Controller untuk manajemen data kecamatan, termasuk pengambilan data kecamatan, detail kecamatan, history risiko, dan ranking kecamatan berdasarkan risiko
const getAllDistricts = asyncHandler(async (req, res) => {
    const validated = DistrictValidator.validateDistrictQuery(req.query);
    const result = await DistrictService.getAllDistricts(validated);
    return responseSuccess(res, result, 'Data kecamatan berhasil diambil');
});

const getDistrictById = asyncHandler(async (req, res) => {
    const { id } = DistrictValidator.validateDistrictId(req.params);
    const district = await DistrictService.getDistrictById(id);

    if (!district) {
        return responseError(res, 'Kecamatan tidak ditemukan', 404);
    }

    const riskHistory = await DistrictRiskService.getDistrictRiskHistory(id, 12);
    district.risk_history = riskHistory;

    return responseSuccess(res, district, 'Detail kecamatan berhasil diambil');
});

const getDistrictRiskHistory = asyncHandler(async (req, res) => {
    const { id } = DistrictValidator.validateDistrictId(req.params);
    const { limit = 30 } = req.query;

    const history = await DistrictRiskService.getDistrictRiskHistory(id, limit);
    return responseSuccess(res, history, 'History risiko kecamatan berhasil diambil');
});

const getDistrictRanking = asyncHandler(async (req, res) => {
    const { limit = 10, sort = 'desc' } = req.query;
    const ranking = await DistrictRiskService.getDistrictRanking();

    const limitedRanking = ranking.slice(0, limit);
    if (sort === 'asc') {
        limitedRanking.reverse();
    }

    return responseSuccess(res, limitedRanking, 'Ranking kecamatan berhasil diambil');
});

module.exports = {
    getAllDistricts,
    getDistrictById,
    getDistrictRiskHistory,
    getDistrictRanking
};