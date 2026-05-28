// src/controllers/auth.js

const { comparePassword, generateTokenPair, blacklistToken, refreshAccessToken } = require('../../config/auth.config');
const { responseSuccess, responseError } = require('../utils/errorHandler');
const AuthValidator = require('../validator/auth/index');
const { UserService } = require('../services/postgres');
const NotificationService = require('../services/postgres/notification');

// Controller untuk autentikasi pengguna, termasuk login, logout, refresh token, dan pengelolaan sesi pengguna
const login = async (req, res) => {
    try {
        const { email, password } = AuthValidator.validateLogin(req.body);

        // Cari pengguna berdasarkan email
        const user = await UserService.getUserByEmail(email);

        if (!user) {
            return responseError(res, 'Email atau password salah', 401);
        }

        if (!user.isActive) {
            return responseError(res, 'Akun Anda telah dinonaktifkan. Hubungi admin.', 403);
        }

        const isValid = await comparePassword(password, user.passwordHash);
        if (!isValid) {
            return responseError(res, 'Email atau password salah', 401);
        }

        const fullUser = await UserService.getUserById(user.id);

        // Generate token akses dan refresh token untuk sesi pengguna
        const { accessToken, refreshToken, expiresIn } = generateTokenPair({
            id: user.id,
            email: user.email,
            peran: user.role,
            sekolah_id: fullUser.schoolId,
            perusahaan_csr_id: fullUser.csrCompanyId
        });

        // Simpan notifikasi untuk pengguna yang baru login
        await NotificationService.createNotification({
            userId: user.id,
            title: 'Login Berhasil',
            message: `Anda telah login pada ${new Date().toLocaleString()}`,
            type: 'success',
            link: '/dashboard'
        });

        // Kembalikan token dan informasi pengguna yang berhasil login
        return responseSuccess(res, {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: expiresIn,
            user: {
                id: user.id,
                name: fullUser.fullName,
                email: user.email,
                role: user.role,
                school_id: fullUser.schoolId,
                csr_company_id: fullUser.csrCompanyId
            }
        }, 'Login berhasil');

    } catch (error) {
        if (error.name === 'InvariantError') {
            return responseError(res, error.message, 400);
        }
        console.error('Login error:', error);
        return responseError(res, 'Terjadi kesalahan saat login');
    }
};

// Fungsi untuk logout pengguna dengan cara mem-blacklist token akses yang digunakan
const logout = async (req, res) => {
    try {
        // Ambil token akses dari header Authorization dan masukkan ke blacklist untuk mencegah penggunaan kembali
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            blacklistToken(token);
        }
        return responseSuccess(res, null, 'Logout berhasil');
    } catch (error) {
        return responseError(res, 'Terjadi kesalahan saat logout');
    }
};

// Fungsi untuk memperbarui token akses menggunakan refresh token yang valid
const refreshToken = async (req, res) => {
    try {
        // Ambil refresh token dari body permintaan dan validasi untuk menghasilkan token akses baru
        const { refresh_token } = req.body;

        if (!refresh_token) {
            return responseError(res, 'Refresh token diperlukan', 400);
        }

        // Validasi dan perbarui token akses menggunakan refresh token yang diberikan
        const { accessToken, expiresIn } = refreshAccessToken(refresh_token);

        return responseSuccess(res, {
            access_token: accessToken,
            expires_in: expiresIn
        }, 'Token berhasil diperbarui');
    } catch (error) {
        return responseError(res, error.message, 401);
    }
};

// Fungsi untuk mengambil data pengguna yang sedang login berdasarkan token akses yang valid
const getMe = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.user.id);

        if (!user) {
            return responseError(res, 'User tidak ditemukan', 404);
        }

        // Simpan notifikasi untuk pengguna yang mengambil data profil
        return responseSuccess(res, {
            id: user.id,
            name: user.fullName,
            email: user.email,
            role: user.role,
            school_id: user.schoolId,
            csr_company_id: user.csrCompanyId,
            is_active: user.isActive,
            created_at: user.createdAt
        }, 'Data user berhasil diambil');

    } catch (error) {
        console.error('GetMe error:', error);
        return responseError(res, 'Terjadi kesalahan');
    }
};

const changePassword = async (req, res) => {
    return responseError(res, 'Fitur change password akan segera tersedia', 501);
};

const forgotPassword = async (req, res) => {
    return responseError(res, 'Fitur forgot password akan segera tersedia', 501);
};

const resetPassword = async (req, res) => {
    return responseError(res, 'Fitur reset password akan segera tersedia', 501);
};

module.exports = {
    login,
    logout,
    refreshToken,
    getMe,
    changePassword,
    forgotPassword,
    resetPassword
};