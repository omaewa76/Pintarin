const { responseSuccess, responseError } = require('../utils/errorHandler');
const CSRCompanyService = require('../services/postgres/CSRCompanyService');
const AssistanceRequestService = require('../services/postgres/AssistanceRequestService');
const NotificationService = require('../services/postgres/NotificationService');
const CSRValidator = require('../validators/csr');

const getAllCompanies = async (req, res) => {
    try {
        const validated = CSRValidator.validateCompanyQuery(req.query);
        const result = await CSRCompanyService.getAllCompanies(validated);
        return responseSuccess(res, result, 'Data perusahaan berhasil diambil');
    } catch (error) {
        if (error.name === 'InvariantError') {
            return responseError(res, error.message, 400);
        }
        console.error('GetAllCompanies error:', error);
        return responseError(res, 'Terjadi kesalahan');
    }
};

const getAllAssistanceRequests = async (req, res) => {
    try {
        const validated = CSRValidator.validateAssistanceQuery(req.query);

        // Filter berdasarkan role user
        if (req.user.role === 'csr') {
            const company = await CSRCompanyService.getCompanyByUserId(req.user.id);
            validated.csrCompanyId = company?.id;
        } else if (req.user.role === 'sekolah') {
            validated.schoolId = req.user.school_id;
        }

        const result = await AssistanceRequestService.getAllRequests(validated);
        return responseSuccess(res, result, 'Data pengajuan bantuan berhasil diambil');
    } catch (error) {
        if (error.name === 'InvariantError') {
            return responseError(res, error.message, 400);
        }
        console.error('GetAllAssistanceRequests error:', error);
        return responseError(res, 'Terjadi kesalahan');
    }
};

const getAssistanceRequestById = async (req, res) => {
    try {
        const { id } = CSRValidator.validateAssistanceId(req.params);
        const request = await AssistanceRequestService.getRequestById(id);

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

const createAssistanceRequest = async (req, res) => {
    try {
        const validated = CSRValidator.validateCreateAssistance(req.body);

        // Dapatkan ID perusahaan CSR dari user yang login
        const company = await CSRCompanyService.getCompanyByUserId(req.user.id);
        if (!company) {
            return responseError(res, 'Perusahaan CSR tidak ditemukan', 404);
        }

        const newRequest = await AssistanceRequestService.createRequest({
            csrCompanyId: company.id,
            ...validated
        });

        // Buat notifikasi untuk sekolah penerima
        await NotificationService.createNotification({
            userId: newRequest.schoolId, // Perlu mapping school_id ke user_id
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

const approveAssistanceRequest = async (req, res) => {
    try {
        const { id } = CSRValidator.validateApproveAssistance(req.params);
        const request = await AssistanceRequestService.approveRequest(id, req.user.id);

        if (!request) {
            return responseError(res, 'Pengajuan tidak ditemukan', 404);
        }

        // Buat notifikasi untuk CSR
        await NotificationService.createNotification({
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

const rejectAssistanceRequest = async (req, res) => {
    try {
        const validated = CSRValidator.validateRejectAssistance(req.params, req.body);
        const request = await AssistanceRequestService.rejectRequest(
            validated.id,
            req.user.id,
            validated.rejection_reason
        );

        if (!request) {
            return responseError(res, 'Pengajuan tidak ditemukan', 404);
        }

        // Buat notifikasi untuk CSR
        await NotificationService.createNotification({
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

module.exports = {
    getAllCompanies,
    getAllAssistanceRequests,
    getAssistanceRequestById,
    createAssistanceRequest,
    approveAssistanceRequest,
    rejectAssistanceRequest
};