// src/controllers/submissionController.js
const { responseSuccess, responseError, asyncHandler } = require('../utils/errorHandler');
const SubmissionService = require('../services/postgres/SubmissionService');
const SchoolService = require('../services/postgres/SchoolService');
const NotificationService = require('../services/postgres/NotificationService');
const SubmissionValidator = require('../validators/submission');

const getAllSubmissions = asyncHandler(async (req, res) => {
    const validated = SubmissionValidator.validateSubmissionQuery(req.query);

    // Filter berdasarkan role
    if (req.user.role === 'sekolah') {
        const school = await SchoolService.getSchoolByUserId(req.user.id);
        validated.school_id = school?.id;
    }

    const result = await SubmissionService.getAllSubmissions(validated);
    return responseSuccess(res, result, 'Data pengajuan berhasil diambil');
});

const getSubmissionById = asyncHandler(async (req, res) => {
    const { id } = SubmissionValidator.validateSubmissionId(req.params);
    const submission = await SubmissionService.getSubmissionById(id);

    if (!submission) {
        return responseError(res, 'Pengajuan tidak ditemukan', 404);
    }

    return responseSuccess(res, submission, 'Detail pengajuan berhasil diambil');
});

const createSubmission = asyncHandler(async (req, res) => {
    const validated = SubmissionValidator.validateCreateSubmission(req.body);

    // Dapatkan data sekolah dari user yang login
    const school = await SchoolService.getSchoolByUserId(req.user.id);
    if (!school) {
        return responseError(res, 'Data sekolah tidak ditemukan', 404);
    }

    // Ambil data sebelum perubahan
    const currentData = await SchoolService.getSchoolById(school.id);

    const newSubmission = await SubmissionService.createSubmission({
        schoolId: school.id,
        submittedBy: req.user.id,
        updateType: validated.update_type,
        dataAfter: validated.data_after,
        dataBefore: validated.data_before || currentData
    });

    // Notifikasi ke Dinas
    await NotificationService.broadcastNotification('dinas',
        'Pengajuan Perubahan Data Baru',
        `Sekolah ${school.name} mengajukan perubahan data: ${validated.update_type}`,
        'info',
        `/submissions/${newSubmission.id}`
    );

    return responseSuccess(res, newSubmission, 'Pengajuan berhasil dibuat', 201);
});

const approveSubmission = asyncHandler(async (req, res) => {
    const { id } = SubmissionValidator.validateApproveSubmission(req.params);

    const submission = await SubmissionService.getSubmissionById(id);
    if (!submission) {
        return responseError(res, 'Pengajuan tidak ditemukan', 404);
    }

    const updated = await SubmissionService.approveSubmission(id, req.user.id);

    // Notifikasi ke sekolah
    await NotificationService.createNotification({
        userId: submission.submittedBy,
        title: 'Pengajuan Disetujui',
        message: `Pengajuan ${submission.updateType} telah disetujui oleh Dinas`,
        type: 'success',
        link: `/submissions/${id}`
    });

    return responseSuccess(res, updated, 'Pengajuan berhasil disetujui');
});

const rejectSubmission = asyncHandler(async (req, res) => {
    const validated = SubmissionValidator.validateRejectSubmission(req.params, req.body);

    const submission = await SubmissionService.getSubmissionById(validated.id);
    if (!submission) {
        return responseError(res, 'Pengajuan tidak ditemukan', 404);
    }

    const updated = await SubmissionService.rejectSubmission(validated.id, req.user.id);

    // Notifikasi ke sekolah
    await NotificationService.createNotification({
        userId: submission.submittedBy,
        title: 'Pengajuan Ditolak',
        message: `Pengajuan ${submission.updateType} ditolak. Alasan: ${validated.rejection_reason}`,
        type: 'error',
        link: `/submissions/${validated.id}`
    });

    return responseSuccess(res, updated, 'Pengajuan berhasil ditolak');
});

module.exports = {
    getAllSubmissions,
    getSubmissionById,
    createSubmission,
    approveSubmission,
    rejectSubmission
};