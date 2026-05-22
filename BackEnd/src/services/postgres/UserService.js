const { query } = require('../../../config/db.config');
const { mapUserDBToModel, mapUserAuthToModel } = require('../../utils');

class UserService {
    // Mendapatkan user berdasarkan email (untuk autentikasi)
    static async getUserByEmail(email) {
        const result = await query(
            `SELECT * FROM pengguna WHERE email = $1`,
            [email]
        );

        if (result.rows.length === 0) return null;

        return mapUserAuthToModel(result.rows[0]);
    }

    // Mendapatkan user berdasarkan ID
    static async getUserById(id) {
        const result = await query(
            `SELECT id, nama_lengkap, email, peran, sekolah_id, perusahaan_csr_id, akun_aktif, created_at, updated_at
       FROM pengguna WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) return null;

        return mapUserDBToModel(result.rows[0]);
    }

    // Mendapatkan semua user dengan filter
    static async getAllUsers({ role, status, page = 1, limit = 20 } = {}) {
        const conditions = [];
        const params = [];
        let paramIndex = 1;

        if (role) {
            conditions.push(`peran = $${paramIndex++}`);
            params.push(role);
        }

        if (status === 'active') {
            conditions.push(`akun_aktif = true`);
        } else if (status === 'suspended') {
            conditions.push(`akun_aktif = false`);
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        const countResult = await query(
            `SELECT COUNT(*) as total FROM pengguna ${whereClause}`,
            params
        );
        const total = parseInt(countResult.rows[0].total);

        const offset = (page - 1) * limit;
        params.push(limit, offset);

        const result = await query(
            `SELECT id, nama_lengkap, email, peran, sekolah_id, perusahaan_csr_id, akun_aktif, created_at
       FROM pengguna
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
            params
        );

        const data = result.rows.map(mapUserDBToModel);

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    // Membuat user baru
    static async createUser(data) {
        const { fullName, email, passwordHash, role, schoolId, csrCompanyId } = data;

        const result = await query(
            `INSERT INTO pengguna 
       (nama_lengkap, email, kata_sandi_hash, peran, sekolah_id, perusahaan_csr_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, nama_lengkap, email, peran, sekolah_id, perusahaan_csr_id, akun_aktif`,
            [fullName, email, passwordHash, role, schoolId, csrCompanyId]
        );

        return mapUserDBToModel(result.rows[0]);
    }

    // Suspend akun
    static async suspendUser(id) {
        const result = await query(
            `UPDATE pengguna SET akun_aktif = false, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING id, nama_lengkap, email, peran, akun_aktif`,
            [id]
        );

        if (result.rows.length === 0) return null;

        return mapUserDBToModel(result.rows[0]);
    }

    // Aktifkan akun
    static async activateUser(id) {
        const result = await query(
            `UPDATE pengguna SET akun_aktif = true, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING id, nama_lengkap, email, peran, akun_aktif`,
            [id]
        );

        if (result.rows.length === 0) return null;

        return mapUserDBToModel(result.rows[0]);
    }

    // Update password
    static async updatePassword(id, newPasswordHash) {
        const result = await query(
            `UPDATE pengguna SET kata_sandi_hash = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING id`,
            [newPasswordHash, id]
        );

        return result.rows.length > 0;
    }
}

module.exports = UserService;