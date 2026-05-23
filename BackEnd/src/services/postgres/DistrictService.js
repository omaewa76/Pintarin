// src/services/postgres/DistrictService.js

const { query } = require('../../../config/db.config');
const { mapDistrictDBToModel } = require('../../utils');

class DistrictService {
    // Mendapatkan semua kecamatan dengan pagination
    static async getAllDistricts({ page = 1, limit = 20 } = {}) {
        const offset = (page - 1) * limit;

        const countResult = await query('SELECT COUNT(*) as total FROM kecamatan');
        const total = parseInt(countResult.rows[0].total);

        const result = await query(
            `SELECT k.*, 
        (SELECT rata_rata_skor FROM skor_risiko_kecamatan 
         WHERE kecamatan_id = k.id 
         ORDER BY waktu_perhitungan DESC LIMIT 1) as current_risk_score
       FROM kecamatan k
       ORDER BY k.id
       LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        const data = result.rows.map(mapDistrictDBToModel);

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

    // Mendapatkan detail kecamatan berdasarkan ID
    static async getDistrictById(id) {
        const result = await query(
            `SELECT k.*,
        (SELECT rata_rata_skor FROM skor_risiko_kecamatan 
         WHERE kecamatan_id = k.id 
         ORDER BY waktu_perhitungan DESC LIMIT 1) as current_risk_score,
        (SELECT COUNT(*) FROM sekolah WHERE kecamatan_id = k.id AND status_operasional = 'Aktif') as total_schools
       FROM kecamatan k
       WHERE k.id = $1`,
            [id]
        );

        if (result.rows.length === 0) return null;

        const district = mapDistrictDBToModel(result.rows[0]);

        // Ambil sekolah-sekolah di kecamatan ini
        const schoolsResult = await query(
            `SELECT s.*, 
        (SELECT nilai_skor FROM skor_risiko_sekolah 
         WHERE sekolah_id = s.id 
         ORDER BY waktu_perhitungan DESC LIMIT 1) as risk_score
       FROM sekolah s
       WHERE s.kecamatan_id = $1
       ORDER BY s.nama_sekolah`,
            [id]
        );

        district.schools = schoolsResult.rows.map(school => ({
            id: school.id,
            name: school.nama_sekolah,
            npsn: school.npsn,
            level: school.jenjang,
            status: school.status_operasional,
            riskScore: school.risk_score ? parseFloat(school.risk_score) : null
        }));

        return district;
    }
}

module.exports = DistrictService;