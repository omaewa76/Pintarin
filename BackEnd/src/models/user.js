// src/models/User.js

const BaseModel = require('./base');
const { query } = require('../../config/db.config');

// Model untuk data pengguna dan informasi terkait
class UserModel extends BaseModel {
    static tableName = 'pengguna';
    static primaryKey = 'id';

    static async findByEmail(email) {
        const result = await query(
            `SELECT * FROM ${this.tableName} WHERE email = $1`,
            [email]
        );
        return result.rows[0] || null;
    }

    static async findByRole(role, options = {}) {
        const { page = 1, limit = 20 } = options;
        const offset = (page - 1) * limit;

        const countResult = await query(
            `SELECT COUNT(*) as total FROM ${this.tableName} WHERE peran = $1`,
            [role]
        );
        const total = parseInt(countResult.rows[0].total);

        const result = await query(
            `SELECT * FROM ${this.tableName} WHERE peran = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
            [role, limit, offset]
        );

        return {
            data: result.rows,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    static async findActiveUsers(options = {}) {
        const { page = 1, limit = 20 } = options;
        const offset = (page - 1) * limit;

        const countResult = await query(
            `SELECT COUNT(*) as total FROM ${this.tableName} WHERE akun_aktif = true`,
            []
        );
        const total = parseInt(countResult.rows[0].total);

        const result = await query(
            `SELECT * FROM ${this.tableName} WHERE akun_aktif = true ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        return {
            data: result.rows,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    static async updatePassword(id, passwordHash) {
        const result = await query(
            `UPDATE ${this.tableName} SET kata_sandi_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id`,
            [passwordHash, id]
        );
        return result.rows.length > 0;
    }

    static async suspend(id) {
        const result = await query(
            `UPDATE ${this.tableName} SET akun_aktif = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rows[0] || null;
    }

    static async activate(id) {
        const result = await query(
            `UPDATE ${this.tableName} SET akun_aktif = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rows[0] || null;
    }
}

module.exports = UserModel;