const { query } = require('../config/database');
const { comparePassword, generateTokenPair, blacklistToken, refreshAccessToken } = require('../config/auth');
const { responseSuccess, responseError } = require('../utils/errorHandler');
const AuthValidator = require('../validators/auth');
const UserService = require('../services/postgres/UserService');
const NotificationService = require('../services/postgres/NotificationService');

const login = async (req, res) => {
    try {
        const { email, password } = AuthValidator.validateLogin(req.body);

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

        // Dapatkan data lengkap user
        const fullUser = await UserService.getUserById(user.id);

        // Generate token pair
        const { accessToken, refreshToken, expiresIn } = generateTokenPair({
            id: user.id,
            email: user.email,
            peran: user.role,
            sekolah_id: fullUser.schoolId,
            perusahaan_csr_id: fullUser.csrCompanyId
        });

        // Buat notifikasi login
        await NotificationService.createNotification({
            userId: user.id,
            title: 'Login Berhasil',
            message: `Anda telah login pada ${new Date().toLocaleString()}`,
            type: 'success',
            link: '/dashboard'
        });

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

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            blacklistToken(token);
        }
        return responseSuccess(res, null, 'Logout berhasil');
    } catch (error) {
        return responseError(res, 'Terjadi kesalahan saat logout');
    }
};

const refreshToken = async (req, res) => {
    try {
        const { refresh_token } = req.body;

        if (!refresh_token) {
            return responseError(res, 'Refresh token diperlukan', 400);
        }

        const { accessToken, expiresIn } = refreshAccessToken(refresh_token);

        return responseSuccess(res, {
            access_token: accessToken,
            expires_in: expiresIn
        }, 'Token berhasil diperbarui');

    } catch (error) {
        return responseError(res, error.message, 401);
    }
};

const getMe = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.user.id);

        if (!user) {
            return responseError(res, 'User tidak ditemukan', 404);
        }

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

module.exports = {
    login,
    logout,
    refreshToken,
    getMe
};