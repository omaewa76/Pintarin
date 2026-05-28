// src/controllers/submission.js

const { responseSuccess, responseError, asyncHandler } = require('../utils/errorHandler');
const { SubmissionService, SchoolService } = require('../services/postgres');
const NotificationService = require('../services/postgres/notification');
const SubmissionValidator = require('../validator/submission/index');

// Controller untuk manajemen pengajuan perubahan data sekolah, termasuk pembuatan pengajuan baru oleh sekolah, serta approval/rejection oleh Dinas
const getAllSubmissions = asyncHandler(async (req, res) => {
    const validated = SubmissionValidator.validateSubmissionQuery(req.query);

    // Jika pengguna yang sedang login adalah sekolah, tambahkan filter untuk hanya mengambil pengajuan yang dibuat oleh sekolah tersebut
    if (req.user.role === 'sekolah') {
        const school = await SchoolService.getSchoolByUserId(req.user.id);
        validated.school_id = school?.id;
    }

    const result = await SubmissionService.getAllSubmissions(validated);
    return responseSuccess(res, result, 'Data pengajuan berhasil diambil');
});

// Fungsi untuk mengambil detail pengajuan berdasarkan ID, hanya bisa diakses oleh sekolah yang membuat pengajuan tersebut atau admin Dinas
const getSubmissionById = asyncHandler(async (req, res) => {
    const { id } = SubmissionValidator.validateSubmissionId(req.params);
    const submission = await SubmissionService.getSubmissionById(id);

    if (!submission) {
        return responseError(res, 'Pengajuan tidak ditemukan', 404);
    }

    return responseSuccess(res, submission, 'Detail pengajuan berhasil diambil');
});

// Fungsi untuk membuat pengajuan perubahan data sekolah baru, hanya bisa diakses oleh sekolah, dan akan mengirim notifikasi ke admin Dinas untuk melakukan approval/rejection terhadap pengajuan tersebut
const createSubmission = asyncHandler(async (req, res) => {
    const validated = SubmissionValidator.validateCreateSubmission(req.body);

    const school = await SchoolService.getSchoolByUserId(req.user.id);
    if (!school) {
        return responseError(res, 'Data sekolah tidak ditemukan', 404);
    }

    const currentData = await SchoolService.getSchoolById(school.id);

    const newSubmission = await SubmissionService.createSubmission({
        schoolId: school.id,
        submittedBy: req.user.id,
        updateType: validated.update_type,
        dataAfter: validated.data_after,
        dataBefore: validated.data_before || currentData
    });

    // Kirim notifikasi ke admin Dinas untuk melakukan approval/rejection terhadap pengajuan tersebut
    await NotificationService.broadcastNotification('dinas',
        'Pengajuan Perubahan Data Baru',
        `Sekolah ${school.name} mengajukan perubahan data: ${validated.update_type}`,
        'info',
        `/submissions/${newSubmission.id}`
    );

    return responseSuccess(res, newSubmission, 'Pengajuan berhasil dibuat', 201);
});

// Fungsi untuk menyetujui pengajuan perubahan data sekolah, hanya bisa diakses oleh admin Dinas, dan akan mengirim notifikasi ke sekolah yang membuat pengajuan tersebut tentang hasil approval
const approveSubmission = asyncHandler(async (req, res) => {
    const { id } = SubmissionValidator.validateApproveSubmission(req.params);

    const submission = await SubmissionService.getSubmissionById(id);
    if (!submission) {
        return responseError(res, 'Pengajuan tidak ditemukan', 404);
    }

    const updated = await SubmissionService.approveSubmission(id, req.user.id);

    // Kirim notifikasi ke sekolah yang membuat pengajuan tersebut tentang hasil approval
    await NotificationService.createNotification({
        userId: submission.submittedBy,
        title: 'Pengajuan Disetujui',
        message: `Pengajuan ${submission.updateType} telah disetujui oleh Dinas`,
        type: 'success',
        link: `/submissions/${id}`
    });

    return responseSuccess(res, updated, 'Pengajuan berhasil disetujui');
});

// Fungsi untuk menolak pengajuan perubahan data sekolah, hanya bisa diakses oleh admin Dinas, dan akan mengirim notifikasi ke sekolah yang membuat pengajuan tersebut tentang hasil rejection beserta alasan penolakan
const rejectSubmission = asyncHandler(async (req, res) => {
    const validated = SubmissionValidator.validateRejectSubmission(req.params, req.body);

    const submission = await SubmissionService.getSubmissionById(validated.id);
    if (!submission) {
        return responseError(res, 'Pengajuan tidak ditemukan', 404);
    }

    const updated = await SubmissionService.rejectSubmission(validated.id, req.user.id);

    // Kirim notifikasi ke sekolah yang membuat pengajuan tersebut tentang hasil rejection beserta alasan penolakan
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