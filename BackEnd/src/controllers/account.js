// src/controllers/account.js

const { responseSuccess, responseError, asyncHandler } = require('../utils/errorHandler');
const { UserService } = require('../services/postgres');
const { hashPassword } = require('../../config/auth.config');
const NotificationService = require('../services/postgres/notification');
const AccountValidator = require('../validator/account/index');

// Controller untuk manajemen akun pengguna, termasuk CRUD akun dan pengelolaan status akun (aktif/suspend)
const getAllAccounts = asyncHandler(async (req, res) => {
    if (req.user.role !== 'dinas') {
        return responseError(res, 'Akses ditolak. Hanya admin Dinas yang bisa melihat semua akun.', 403);
    }

    const validated = AccountValidator.validateAccountQuery(req.query);
    const result = await UserService.getAllUsers(validated);

    return responseSuccess(res, result, 'Data akun berhasil diambil');
});

const getAccountById = asyncHandler(async (req, res) => {
    const { id } = AccountValidator.validateAccountId(req.params);

    if (req.user.role !== 'dinas' && req.user.id !== parseInt(id)) {
        return responseError(res, 'Akses ditolak', 403);
    }

    const user = await UserService.getUserById(id);

    if (!user) {
        return responseError(res, 'Akun tidak ditemukan', 404);
    }

    return responseSuccess(res, user, 'Data akun berhasil diambil');
});

const createAccount = asyncHandler(async (req, res) => {
    if (req.user.role !== 'dinas') {
        return responseError(res, 'Akses ditolak. Hanya admin Dinas yang bisa membuat akun.', 403);
    }

    const validated = AccountValidator.validateCreateAccount(req.body);

    const existingUser = await UserService.getUserByEmail(validated.email);
    if (existingUser) {
        return responseError(res, 'Email sudah terdaftar', 409);
    }

    const passwordHash = await hashPassword(validated.password);

    const newUser = await UserService.createUser({
        fullName: validated.full_name,
        email: validated.email,
        passwordHash,
        role: validated.role,
        schoolId: validated.school_id,
        csrCompanyId: validated.csr_company_id
    });

    return responseSuccess(res, newUser, 'Akun berhasil dibuat', 201);
});

const updateAccount = asyncHandler(async (req, res) => {
    const { id } = AccountValidator.validateAccountId(req.params);
    const validated = AccountValidator.validateUpdateAccount(req.body);

    if (req.user.role !== 'dinas' && req.user.id !== parseInt(id)) {
        return responseError(res, 'Akses ditolak', 403);
    }

    const existingUser = await UserService.getUserById(id);
    if (!existingUser) {
        return responseError(res, 'Akun tidak ditemukan', 404);
    }

    const updatedUser = await UserService.updateUser(id, validated);

    return responseSuccess(res, updatedUser, 'Akun berhasil diperbarui');
});

const suspendAccount = asyncHandler(async (req, res) => {
    if (req.user.role !== 'dinas') {
        return responseError(res, 'Akses ditolak. Hanya admin Dinas yang bisa suspend akun.', 403);
    }

    const { id } = AccountValidator.validateAccountId(req.params);
    const { reason } = req.body;

    const user = await UserService.getUserById(id);
    if (!user) {
        return responseError(res, 'Akun tidak ditemukan', 404);
    }

    if (req.user.id === parseInt(id)) {
        return responseError(res, 'Tidak dapat menonaktifkan akun sendiri', 400);
    }

    const suspendedUser = await UserService.suspendUser(id);

    await NotificationService.createNotification({
        userId: id,
        title: 'Akun Dinonaktifkan',
        message: `Akun Anda telah dinonaktifkan oleh admin. ${reason ? `Alasan: ${reason}` : ''}`,
        type: 'error'
    });

    return responseSuccess(res, suspendedUser, 'Akun berhasil dinonaktifkan');
});

const activateAccount = asyncHandler(async (req, res) => {
    if (req.user.role !== 'dinas') {
        return responseError(res, 'Akses ditolak. Hanya admin Dinas yang bisa mengaktifkan akun.', 403);
    }

    const { id } = AccountValidator.validateAccountId(req.params);

    const user = await UserService.getUserById(id);
    if (!user) {
        return responseError(res, 'Akun tidak ditemukan', 404);
    }

    const activatedUser = await UserService.activateUser(id);

    await NotificationService.createNotification({
        userId: id,
        title: 'Akun Diaktifkan',
        message: 'Akun Anda telah diaktifkan kembali oleh admin. Anda sekarang dapat login kembali.',
        type: 'success'
    });

    return responseSuccess(res, activatedUser, 'Akun berhasil diaktifkan');
});

const deleteAccount = asyncHandler(async (req, res) => {
    if (req.user.role !== 'dinas') {
        return responseError(res, 'Akses ditolak. Hanya admin Dinas yang bisa menghapus akun.', 403);
    }

    const { id } = AccountValidator.validateAccountId(req.params);

    if (req.user.id === parseInt(id)) {
        return responseError(res, 'Tidak dapat menghapus akun sendiri', 400);
    }

    const deleted = await UserService.deleteUser(id);

    if (!deleted) {
        return responseError(res, 'Akun tidak ditemukan', 404);
    }

    return responseSuccess(res, null, 'Akun berhasil dihapus');
});

module.exports = {
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    suspendAccount,
    activateAccount,
    deleteAccount
};