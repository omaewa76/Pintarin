// src/controllers/csr.js

const { responseSuccess, responseError } = require('../utils/errorHandler');
const { CSRCompanyService, AssistanceRequestService, NotificationService, CSRService } = require('../services/postgres');
const CSRValidator = require('../validator/csr/index');

// Controller untuk fitur CSR, termasuk manajemen perusahaan CSR, pengajuan bantuan, dan matching kecamatan untuk program CSR
const getAllCompanies = async (req, res) => {
    try {
        // Validasi query parameters untuk filter dan pagination perusahaan CSR
        const validated = CSRValidator.validateCompanyQuery(req.query);
        const result = await CSRCompany.getAllCompanies(validated);
        return responseSuccess(res, result, 'Data perusahaan berhasil diambil');
    } catch (error) {
        if (error.name === 'InvariantError') {
            return responseError(res, error.message, 400);
        }
        console.error('GetAllCompanies error:', error);
        return responseError(res, 'Terjadi kesalahan');
    }
};

// Fungsi untuk mengambil semua pengajuan bantuan, dengan filter berdasarkan peran pengguna (CSR atau sekolah)
const getAllAssistanceRequests = async (req, res) => {
    try {
        // Validasi query parameters untuk filter dan pagination pengajuan bantuan
        const validated = CSRValidator.validateAssistanceQuery(req.query);

        if (req.user.role === 'csr') {
            const company = await CSRCompany.getCompanyByUserId(req.user.id);
            validated.csrCompanyId = company?.id;
        } else if (req.user.role === 'sekolah') {
            validated.schoolId = req.user.school_id;
        }

        // Ambil data pengajuan bantuan dari database berdasarkan filter yang divalidasi
        const result = await AssistanceRequest.getAllRequests(validated);
        return responseSuccess(res, result, 'Data pengajuan bantuan berhasil diambil');
    } catch (error) {
        if (error.name === 'InvariantError') {
            return responseError(res, error.message, 400);
        }
        // Log error untuk debugging dan kembalikan response error generik jika terjadi kesalahan
        console.error('GetAllAssistanceRequests error:', error);
        return responseError(res, 'Terjadi kesalahan');
    }
};

// Fungsi untuk mengambil detail pengajuan bantuan berdasarkan ID, hanya bisa diakses oleh CSR yang membuat pengajuan atau sekolah yang menerima bantuan
const getAssistanceRequestById = async (req, res) => {
    try {
        // Validasi parameter ID untuk mengambil detail pengajuan bantuan
        const { id } = CSRValidator.validateAssistanceId(req.params);
        const request = await AssistanceRequest.getRequestById(id);

        if (!request) {
            return responseError(res, 'Pengajuan tidak ditemukan', 404);
        }

        return responseSuccess(res, request, 'Detail pengajuan berhasil diambil');
    } catch (error) {
        if (error.name === 'InvariantError') {
            return responseError(res, error.message, 400);
        }
        console.error('GetAssistanceRequestById error:', error);
        return responseError(res, 'Terjadi kesalahan');
    }
};

// Fungsi untuk membuat pengajuan bantuan baru, hanya bisa diakses oleh pengguna dengan peran CSR
const createAssistanceRequest = async (req, res) => {
    try {
        // Validasi data input untuk membuat pengajuan bantuan baru
        const validated = CSRValidator.validateCreateAssistance(req.body);

        const company = await CSRCompany.getCompanyByUserId(req.user.id);
        if (!company) {
            return responseError(res, 'Perusahaan CSR tidak ditemukan', 404);
        }

        // Simpan pengajuan bantuan baru ke database dan buat notifikasi untuk sekolah yang menerima bantuan
        const newRequest = await AssistanceRequest.createRequest({
            csrCompanyId: company.id,
            ...validated
        });

        // Simpan notifikasi untuk sekolah yang menerima bantuan
        await Notification.createNotification({
            userId: newRequest.schoolId,
            title: 'Pengajuan Bantuan Baru',
            message: `Perusahaan ${company.name} mengajukan bantuan ${validated.type} untuk sekolah Anda`,
            type: 'info',
            link: `/assistance/${newRequest.id}`
        });

        return responseSuccess(res, newRequest, 'Pengajuan bantuan berhasil dibuat', 201);
    } catch (error) {
        if (error.name === 'InvariantError') {
            return responseError(res, error.message, 400);
        }
        console.error('CreateAssistanceRequest error:', error);
        return responseError(res, 'Terjadi kesalahan');
    }
};

// Fungsi untuk menyetujui pengajuan bantuan, hanya bisa diakses oleh admin Dinas, dan akan membuat notifikasi untuk CSR yang mengajukan bantuan
const approveAssistanceRequest = async (req, res) => {
    try {
        const { id } = CSRValidator.validateApproveAssistance(req.params);
        const request = await AssistanceRequest.approveRequest(id, req.user.id);

        if (!request) {
            return responseError(res, 'Pengajuan tidak ditemukan', 404);
        }

        // Simpan notifikasi untuk CSR yang mengajukan bantuan
        await Notification.createNotification({
            userId: request.csrCompanyId,
            title: 'Pengajuan Bantuan Disetujui',
            message: `Pengajuan bantuan ${request.type} untuk ${request.schoolName} telah disetujui oleh Dinas`,
            type: 'success',
            link: `/assistance/${request.id}`
        });

        return responseSuccess(res, request, 'Pengajuan bantuan berhasil disetujui');
    } catch (error) {
        if (error.name === 'InvariantError') {
            return responseError(res, error.message, 400);
        }
        console.error('ApproveAssistanceRequest error:', error);
        return responseError(res, 'Terjadi kesalahan');
    }
};

// Fungsi untuk menolak pengajuan bantuan, hanya bisa diakses oleh admin Dinas, dan akan membuat notifikasi untuk CSR yang mengajukan bantuan dengan alasan penolakan
const rejectAssistanceRequest = async (req, res) => {
    try {
        // Validasi parameter ID dan alasan penolakan untuk menolak pengajuan bantuan
        const validated = CSRValidator.validateRejectAssistance(req.params, req.body);
        const request = await AssistanceRequest.rejectRequest(
            validated.id,
            req.user.id,
            validated.rejection_reason
        );

        if (!request) {
            return responseError(res, 'Pengajuan tidak ditemukan', 404);
        }

        // Simpan notifikasi untuk CSR yang mengajukan bantuan dengan alasan penolakan
        await Notification.createNotification({
            userId: request.csrCompanyId,
            title: 'Pengajuan Bantuan Ditolak',
            message: `Pengajuan bantuan ${request.type} untuk ${request.schoolName} ditolak. Alasan: ${validated.rejection_reason}`,
            type: 'error',
            link: `/assistance/${request.id}`
        });

        return responseSuccess(res, request, 'Pengajuan bantuan berhasil ditolak');
    } catch (error) {
        if (error.name === 'InvariantError') {
            return responseError(res, error.message, 400);
        }
        console.error('RejectAssistanceRequest error:', error);
        return responseError(res, 'Terjadi kesalahan');
    }
};

const getCompanyById = async (req, res) => {
    return responseError(res, 'Fitur get company by id akan segera tersedia', 501);
};

const createCompany = async (req, res) => {
    return responseError(res, 'Fitur create company akan segera tersedia', 501);
};

const updateCompany = async (req, res) => {
    return responseError(res, 'Fitur update company akan segera tersedia', 501);
};

const deleteCompany = async (req, res) => {
    return responseError(res, 'Fitur delete company akan segera tersedia', 501);
};

const completeAssistanceRequest = async (req, res) => {
    return responseError(res, 'Fitur complete assistance request akan segera tersedia', 501);
};

const matchDistricts = async (req, res) => {
    try {
        const { focus_area = 'umum', budget_range = 'semua' } = req.body;
        const userId = req.user?.id || null;

        const result = await CSR.getMatchingRecommendations({
            focusArea: focus_area,
            budgetRange: budget_range,
            userId,
        });

        return responseSuccess(res, result, 'Rekomendasi kecamatan untuk program CSR berhasil ditemukan');
    } catch (error) {
        if (error.name === 'InvariantError') {
            return responseError(res, error.message, 400);
        }
        console.error('matchDistricts error:', error);
        return responseError(res, 'Terjadi kesalahan saat mencari rekomendasi kecamatan');
    }
};

const getMatchHistory = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { limit = 10 } = req.query;

        if (!userId) {
            return responseSuccess(res, [], 'History matching kosong');
        }

        const history = await CSR.getMatchHistory(userId, parseInt(limit));
        return responseSuccess(res, history, 'History matching berhasil diambil');
    } catch (error) {
        if (error.name === 'InvariantError') {
            return responseError(res, error.message, 400);
        }
        console.error('getMatchHistory error:', error);
        return responseError(res, 'Terjadi kesalahan saat mengambil history matching');
    }
};

module.exports = {
    getAllCompanies,
    getAllAssistanceRequests,
    getAssistanceRequestById,
    createAssistanceRequest,
    approveAssistanceRequest,
    rejectAssistanceRequest,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany,
    completeAssistanceRequest,
    matchDistricts,
    getMatchHistory,
};