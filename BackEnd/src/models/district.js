// src/models/District.js

const BaseModel = require('./base');
const { query } = require('../../config/db.config');

// Model untuk data kecamatan dan informasi terkait
class DistrictModel extends BaseModel {
    static tableName = 'kecamatan';
    static primaryKey = 'id';

    static async findAllWithRisk(options = {}) {
        const { page = 1, limit = 20, search } = options;
        const offset = (page - 1) * limit;
        const conditions = [];
        const params = [];

        let paramIndex = 1;
        if (search) {
            conditions.push(`k.nama_kecamatan ILIKE $${paramIndex++}`);
            params.push(`%${search}%`);
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        const countResult = await query(
            `SELECT COUNT(*) as total FROM ${this.tableName} k ${whereClause}`,
            params
        );
        const total = parseInt(countResult.rows[0].total);

        params.push(limit, offset);

        const result = await query(
            `SELECT k.*, 
                (SELECT rata_rata_skor FROM skor_risiko_kecamatan 
                 WHERE kecamatan_id = k.id ORDER BY waktu_perhitungan DESC LIMIT 1) as current_risk_score
             FROM ${this.tableName} k
             ${whereClause}
             ORDER BY k.id
             LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
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

    static async findByIdWithSchools(id) {
        const district = await this.findById(id);
        if (!district) return null;

        const schools = await query(
            `SELECT id, nama_sekolah, npsn, jenjang, status_operasional 
             FROM sekolah WHERE kecamatan_id = $1 
             ORDER BY nama_sekolah`,
            [id]
        );

        return {
            ...district,
            schools: schools.rows,
            total_schools: schools.rows.length,
        };
    }
}

module.exports = DistrictModel;