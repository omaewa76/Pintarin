// src/controllers/school.js

const { responseSuccess, responseError } = require('../utils/errorHandler');
const { SchoolService, RiskScoreService } = require('../services/postgres');
const SchoolValidator = require('../validator/school/index');

// Controller untuk manajemen data sekolah, termasuk pengambilan data sekolah, detail sekolah, verifikasi sekolah, history risiko sekolah, serta fitur CRUD untuk data sekolah (fitur CRUD masih dalam pengembangan)
const getAllSchools = async (req, res) => {
    try {
        const validatedQuery = SchoolValidator.validateSchoolQuery(req.query);
        const result = await SchoolService.getAllSchools(validatedQuery);
        return responseSuccess(res, result, 'Data sekolah berhasil diambil');
    } catch (error) {
        if (error.name === 'InvariantError') {
            return responseError(res, error.message, 400);
        }
        console.error('GetAllSchools error:', error);
        return responseError(res, 'Terjadi kesalahan saat mengambil data sekolah');
    }
};

const getSchoolById = async (req, res) => {
    try {
        const { id } = SchoolValidator.validateSchoolId(req.params);
        const school = await SchoolService.getSchoolById(id);

        if (!school) {
            return responseError(res, 'Sekolah tidak ditemukan', 404);
        }

        return responseSuccess(res, school, 'Detail sekolah berhasil diambil');
    } catch (error) {
        if (error.name === 'InvariantError') {
            return responseError(res, error.message, 400);
        }
        console.error('GetSchoolById error:', error);
        return responseError(res, 'Terjadi kesalahan');
    }
};

const verifySchool = async (req, res) => {
    try {
        const { id } = SchoolValidator.validateVerifySchool(req.params);
        const school = await SchoolService.verifySchool(id);

        if (!school) {
            return responseError(res, 'Sekolah tidak ditemukan', 404);
        }

        return responseSuccess(res, school, 'Sekolah berhasil diverifikasi');
    } catch (error) {
        if (error.name === 'InvariantError') {
            return responseError(res, error.message, 400);
        }
        console.error('VerifySchool error:', error);
        return responseError(res, 'Terjadi kesalahan saat verifikasi sekolah');
    }
};

const getSchoolRiskHistory = async (req, res) => {
    try {
        const validated = SchoolValidator.validateRiskHistory({ ...req.params, ...req.query });
        const history = await RiskScoreService.getSchoolRiskHistory(validated.id, validated.limit);
        return responseSuccess(res, history, 'History risiko berhasil diambil');
    } catch (error) {
        if (error.name === 'InvariantError') {
            return responseError(res, error.message, 400);
        }
        console.error('GetSchoolRiskHistory error:', error);
        return responseError(res, 'Terjadi kesalahan');
    }
};

const createSchool = async (req, res) => {
    return responseError(res, 'Fitur create school akan segera tersedia', 501);
};

const updateSchool = async (req, res) => {
    return responseError(res, 'Fitur update school akan segera tersedia', 501);
};

const deleteSchool = async (req, res) => {
    return responseError(res, 'Fitur delete school akan segera tersedia', 501);
};

module.exports = {
    getAllSchools,
    getSchoolById,
    verifySchool,
    getSchoolRiskHistory,
    createSchool,
    updateSchool,
    deleteSchool
};