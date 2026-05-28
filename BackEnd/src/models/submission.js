// src/models/Submission.js

const BaseModel = require('./base');
const { query } = require('../../config/db.config');

// Model untuk menyimpan pengajuan perubahan data sekolah oleh pengguna
class SubmissionModel extends BaseModel {
    static tableName = 'pengajuan_perubahan_data';
    static primaryKey = 'id';

    static async findAllWithDetails(options = {}) {
        const { status, schoolId, page = 1, limit = 20 } = options;
        const offset = (page - 1) * limit;
        const conditions = [];
        const params = [];

        let paramIndex = 1;
        if (status) {
            conditions.push(`ps.status_pengajuan = $${paramIndex++}`);
            params.push(status);
        }
        if (schoolId) {
            conditions.push(`ps.sekolah_id = $${paramIndex++}`);
            params.push(schoolId);
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        const countResult = await query(
            `SELECT COUNT(*) as total FROM ${this.tableName} ps ${whereClause}`,
            params
        );
        const total = parseInt(countResult.rows[0].total);

        params.push(limit, offset);

        const result = await query(`
            SELECT ps.*, 
                s.nama_sekolah,
                u1.nama_lengkap as nama_pengaju,
                u2.nama_lengkap as nama_reviewer
            FROM ${this.tableName} ps
            LEFT JOIN sekolah s ON ps.sekolah_id = s.id
            LEFT JOIN pengguna u1 ON ps.diajukan_oleh = u1.id
            LEFT JOIN pengguna u2 ON ps.diverifikasi_oleh = u2.id
            ${whereClause}
            ORDER BY ps.created_at DESC
            LIMIT $${paramIndex++} OFFSET $${paramIndex++}
        `, params);

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

    static async approve(id, reviewerId) {
        const result = await query(`
            UPDATE ${this.tableName} 
            SET status_pengajuan = 'Approved', 
                diverifikasi_oleh = $2, 
                waktu_verifikasi = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING *
        `, [id, reviewerId]);
        return result.rows[0] || null;
    }

    static async reject(id, reviewerId, reason) {
        const result = await query(`
            UPDATE ${this.tableName} 
            SET status_pengajuan = 'Rejected', 
                diverifikasi_oleh = $2, 
                waktu_verifikasi = CURRENT_TIMESTAMP,
                rejection_reason = $3
            WHERE id = $1
            RETURNING *
        `, [id, reviewerId, reason]);
        return result.rows[0] || null;
    }
}

module.exports = SubmissionModel;