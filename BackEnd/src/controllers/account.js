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

    // Validasi query parameters untuk filter dan pagination
    const validated = AccountValidator.validateAccountQuery(req.query);
    const result = await UserService.getAllUsers(validated);

    return responseSuccess(res, result, 'Data akun berhasil diambil');
});

// Fungsi untuk mengambil detail akun berdasarkan ID, hanya bisa diakses oleh admin Dinas atau pemilik akun itu sendiri
const getAccountById = asyncHandler(async (req, res) => {
    const { id } = AccountValidator.validateAccountId(req.params);

    if (req.user.role !== 'dinas' && req.user.id !== parseInt(id)) {
        return responseError(res, 'Akses ditolak', 403);
    }

    // Ambil data akun dari database
    const user = await UserService.getUserById(id);

    if (!user) {
        return responseError(res, 'Akun tidak ditemukan', 404);
    }

    return responseSuccess(res, user, 'Data akun berhasil diambil');
});

// Fungsi untuk membuat akun baru, hanya bisa diakses oleh admin Dinas
const createAccount = asyncHandler(async (req, res) => {
    if (req.user.role !== 'dinas') {
        return responseError(res, 'Akses ditolak. Hanya admin Dinas yang bisa membuat akun.', 403);
    }

    // Validasi data input untuk pembuatan akun baru
    const validated = AccountValidator.validateCreateAccount(req.body);

    const existingUser = await UserService.getUserByEmail(validated.email);
    if (existingUser) {
        return responseError(res, 'Email sudah terdaftar', 409);
    }

    // Hash password sebelum menyimpan ke database
    const passwordHash = await hashPassword(validated.password);

    const newUser = await UserService.createUser({
        fullName: validated.full_name,
        email: validated.email,
        passwordHash,
        role: validated.role,
        schoolId: validated.school_id,
        csrCompanyId: validated.csr_company_id
    });

    // Simpan notifikasi untuk pengguna baru
    return responseSuccess(res, newUser, 'Akun berhasil dibuat', 201);
});

// Fungsi untuk memperbarui data akun, hanya bisa diakses oleh admin Dinas atau pemilik akun itu sendiri
const updateAccount = asyncHandler(async (req, res) => {
    const { id } = AccountValidator.validateAccountId(req.params);
    const validated = AccountValidator.validateUpdateAccount(req.body);

    if (req.user.role !== 'dinas' && req.user.id !== parseInt(id)) {
        return responseError(res, 'Akses ditolak', 403);
    }

    // Ambil data akun yang akan diperbarui
    const existingUser = await UserService.getUserById(id);
    if (!existingUser) {
        return responseError(res, 'Akun tidak ditemukan', 404);
    }

    const updatedUser = await UserService.updateUser(id, validated);

    return responseSuccess(res, updatedUser, 'Akun berhasil diperbarui');
});

// Fungsi untuk menonaktifkan akun, hanya bisa diakses oleh admin Dinas
const suspendAccount = asyncHandler(async (req, res) => {
    if (req.user.role !== 'dinas') {
        return responseError(res, 'Akses ditolak. Hanya admin Dinas yang bisa suspend akun.', 403);
    }

    // Validasi ID akun yang akan dinonaktifkan dan alasan penonaktifan
    const { id } = AccountValidator.validateAccountId(req.params);
    const { reason } = req.body;

    // Ambil data akun yang akan dinonaktifkan
    const user = await UserService.getUserById(id);
    if (!user) {
        return responseError(res, 'Akun tidak ditemukan', 404);
    }

    // Cegah admin menonaktifkan akun sendiri
    if (req.user.id === parseInt(id)) {
        return responseError(res, 'Tidak dapat menonaktifkan akun sendiri', 400);
    }

    const suspendedUser = await UserService.suspendUser(id);

    // Simpan notifikasi untuk pengguna yang akunnya dinonaktifkan
    await NotificationService.createNotification({
        userId: id,
        title: 'Akun Dinonaktifkan',
        message: `Akun Anda telah dinonaktifkan oleh admin. ${reason ? `Alasan: ${reason}` : ''}`,
        type: 'error'
    });

    return responseSuccess(res, suspendedUser, 'Akun berhasil dinonaktifkan');
});

// Fungsi untuk mengaktifkan kembali akun yang sebelumnya dinonaktifkan, hanya bisa diakses oleh admin Dinas
const activateAccount = asyncHandler(async (req, res) => {
    if (req.user.role !== 'dinas') {
        return responseError(res, 'Akses ditolak. Hanya admin Dinas yang bisa mengaktifkan akun.', 403);
    }

    const { id } = AccountValidator.validateAccountId(req.params);

    // Ambil data akun yang akan diaktifkan kembali
    const user = await UserService.getUserById(id);
    if (!user) {
        return responseError(res, 'Akun tidak ditemukan', 404);
    }

    const activatedUser = await UserService.activateUser(id);

    // Simpan notifikasi untuk pengguna yang akunnya diaktifkan kembali
    await NotificationService.createNotification({
        userId: id,
        title: 'Akun Diaktifkan',
        message: 'Akun Anda telah diaktifkan kembali oleh admin. Anda sekarang dapat login kembali.',
        type: 'success'
    });

    return responseSuccess(res, activatedUser, 'Akun berhasil diaktifkan');
});

// Fungsi untuk menghapus akun, hanya bisa diakses oleh admin Dinas
const deleteAccount = asyncHandler(async (req, res) => {
    if (req.user.role !== 'dinas') {
        return responseError(res, 'Akses ditolak. Hanya admin Dinas yang bisa menghapus akun.', 403);
    }

    const { id } = AccountValidator.validateAccountId(req.params);

    // Cegah admin menghapus akun sendiri
    if (req.user.id === parseInt(id)) {
        return responseError(res, 'Tidak dapat menghapus akun sendiri', 400);
    }

    // Ambil data akun yang akan dihapus
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