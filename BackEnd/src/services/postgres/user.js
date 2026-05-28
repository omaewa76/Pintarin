// src/services/postgres/user.js

const { UserModel } = require('../../models');
const { mapUserDBToModel, mapUserAuthToModel } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');

// Service untuk manajemen pengguna, termasuk pengambilan data pengguna berdasarkan email atau ID, pengambilan daftar pengguna dengan filter dan pagination, pembuatan pengguna baru, pembaruan data pengguna, penangguhan dan aktivasi pengguna, penghapusan pengguna, pembaruan kata sandi, serta validasi keberadaan pengguna berdasarkan ID.
class UserService {
    static async getUserByEmail(email) {
        const user = await UserModel.findByEmail(email);
        if (!user) return null;
        return mapUserAuthToModel(user);
    }

    static async getUserById(id) {
        const user = await UserModel.findById(id);
        if (!user) return null;
        return mapUserDBToModel(user);
    }

    // Fungsi untuk mengambil daftar pengguna berdasarkan peran atau status akun, dengan dukungan pagination untuk mengelola jumlah data yang diambil dalam satu permintaan, serta menyertakan informasi nama lengkap, email, peran, dan tanggal pembuatan akun untuk memberikan gambaran lengkap tentang pengguna yang sesuai dengan filter yang diterapkan
    static async getAllUsers({ role, status, page = 1, limit = 20 } = {}) {
        let users;
        if (role) {
            const result = await UserModel.findByRole(role, { page, limit });
            users = result;
        } else if (status === 'active') {
            const result = await UserModel.findActiveUsers({ page, limit });
            users = result;
        } else {
            const result = await UserModel.findAll({ page, limit });
            users = result;
        }

        return {
            data: users.data.map(mapUserDBToModel),
            pagination: users.pagination,
        };
    }

    // Fungsi untuk mengambil daftar pengguna yang memiliki akun aktif, dengan dukungan pagination untuk mengelola jumlah data yang diambil dalam satu permintaan, serta menyertakan informasi nama lengkap, email, peran, dan tanggal pembuatan akun untuk memberikan gambaran lengkap tentang pengguna yang sedang aktif dalam sistem
    static async createUser(data) {
        const { fullName, email, passwordHash, role, schoolId, csrCompanyId } = data;

        const newUser = await UserModel.create({
            nama_lengkap: fullName,
            email,
            kata_sandi_hash: passwordHash,
            peran: role,
            sekolah_id: schoolId || null,
            perusahaan_csr_id: csrCompanyId || null,
            akun_aktif: true,
        });

        return mapUserDBToModel(newUser);
    }

    // Fungsi untuk memperbarui data pengguna, dengan menyimpan perubahan data ke database dan kemudian mengambil detail pengguna tersebut berdasarkan ID setelah pembaruan dilakukan, dengan join ke tabel sekolah untuk mendapatkan nama sekolah terkait jika pengguna tersebut adalah admin sekolah, serta menyertakan informasi peran dan status akun untuk memberikan gambaran lengkap tentang profil pengguna tersebut
    static async updateUser(id, data) {
        const updateData = {};
        if (data.fullName) updateData.nama_lengkap = data.fullName;
        if (data.email) updateData.email = data.email;
        if (data.role) updateData.peran = data.role;
        if (data.schoolId !== undefined) updateData.sekolah_id = data.schoolId;
        if (data.csrCompanyId !== undefined) updateData.perusahaan_csr_id = data.csrCompanyId;

        const updatedUser = await UserModel.updateById(id, updateData);
        if (!updatedUser) return null;
        return mapUserDBToModel(updatedUser);
    }

    static async suspendUser(id) {
        const suspendedUser = await UserModel.suspend(id);
        if (!suspendedUser) return null;
        return mapUserDBToModel(suspendedUser);
    }

    static async activateUser(id) {
        const activatedUser = await UserModel.activate(id);
        if (!activatedUser) return null;
        return mapUserDBToModel(activatedUser);
    }

    static async deleteUser(id) {
        const deleted = await UserModel.deleteById(id);
        return deleted;
    }

    static async updatePassword(id, newPasswordHash) {
        return await UserModel.updatePassword(id, newPasswordHash);
    }

    static async validateUserExists(id) {
        const user = await this.getUserById(id);
        if (!user) {
            throw new InvariantError('User tidak ditemukan', 404);
        }
        return user;
    }
}

module.exports = UserService;