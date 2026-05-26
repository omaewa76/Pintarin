// src/models/CSRCompanyModel.js

const BaseModel = require('./base');
const { query } = require('../../config/db.config');

// Model untuk perusahaan CSR yang bekerja sama dengan sekolah
class CSRCompanyModel extends BaseModel {
    static tableName = 'perusahaan_csr';
    static primaryKey = 'id';

    static async findByUserId(userId) {
        const result = await query(
            `SELECT pc.* FROM ${this.tableName} pc
             JOIN pengguna u ON u.perusahaan_csr_id = pc.id
             WHERE u.id = $1`,
            [userId]
        );
        return result.rows[0] || null;
    }

    static async findAllWithFilters(options = {}) {
        const { page = 1, limit = 20, search, verified } = options;
        const offset = (page - 1) * limit;
        const conditions = [];
        const params = [];

        let paramIndex = 1;
        if (search) {
            conditions.push(`nama_perusahaan ILIKE $${paramIndex++}`);
            params.push(`%${search}%`);
        }
        if (verified !== undefined) {
            conditions.push(`sudah_diverifikasi = $${paramIndex++}`);
            params.push(verified);
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        const countResult = await query(
            `SELECT COUNT(*) as total FROM ${this.tableName} ${whereClause}`,
            params
        );
        const total = parseInt(countResult.rows[0].total);

        params.push(limit, offset);

        const result = await query(
            `SELECT * FROM ${this.tableName} ${whereClause} ORDER BY id LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
            params
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

    static async verify(id) {
        const result = await query(
            `UPDATE ${this.tableName} SET sudah_diverifikasi = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rows[0] || null;
    }
}

module.exports = CSRCompanyModel;