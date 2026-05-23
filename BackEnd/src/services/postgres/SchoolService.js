// src/services/postgres/SchoolService.js

const { query } = require('../../../config/db.config');
const { mapSchoolDBToModel } = require('../../utils');

class SchoolService {
    // Mendapatkan semua sekolah dengan filter
    static async getAllSchools({
        districtId,
        level,
        status,
        riskCategory,
        search,
        page = 1,
        limit = 20
    } = {}) {
        const conditions = [];
        const params = [];
        let paramIndex = 1;

        if (districtId) {
            conditions.push(`s.kecamatan_id = $${paramIndex++}`);
            params.push(districtId);
        }

        if (level) {
            conditions.push(`s.jenjang = $${paramIndex++}`);
            params.push(level);
        }

        if (status) {
            conditions.push(`s.status_operasional = $${paramIndex++}`);
            params.push(status);
        }

        if (riskCategory) {
            conditions.push(`rs.kategori_risiko = $${paramIndex++}`);
            params.push(riskCategory);
        }

        if (search) {
            conditions.push(`(s.nama_sekolah ILIKE $${paramIndex++} OR s.npsn ILIKE $${paramIndex++})`);
            params.push(`%${search}%`, `%${search}%`);
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        const countQuery = `
      SELECT COUNT(*) as total
      FROM sekolah s
      LEFT JOIN (
        SELECT DISTINCT ON (sekolah_id) sekolah_id, nilai_skor, kategori_risiko
        FROM skor_risiko_sekolah
        ORDER BY sekolah_id, waktu_perhitungan DESC
      ) rs ON s.id = rs.sekolah_id
      ${whereClause}
    `;

        const countResult = await query(countQuery, params);
        const total = parseInt(countResult.rows[0].total);

        const offset = (page - 1) * limit;
        params.push(limit, offset);

        const dataQuery = `
      SELECT 
        s.*,
        k.nama_kecamatan,
        COALESCE(rs.nilai_skor, 0) as risk_score,
        COALESCE(rs.kategori_risiko, 'Belum Terhitung') as risk_category,
        (SELECT waktu_perhitungan FROM skor_risiko_sekolah 
         WHERE sekolah_id = s.id 
         ORDER BY waktu_perhitungan DESC LIMIT 1) as last_computed
      FROM sekolah s
      LEFT JOIN kecamatan k ON s.kecamatan_id = k.id
      LEFT JOIN (
        SELECT DISTINCT ON (sekolah_id) sekolah_id, nilai_skor, kategori_risiko
        FROM skor_risiko_sekolah
        ORDER BY sekolah_id, waktu_perhitungan DESC
      ) rs ON s.id = rs.sekolah_id
      ${whereClause}
      ORDER BY s.id
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;

        const result = await query(dataQuery, params);
        const data = result.rows.map(mapSchoolDBToModel);

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

    // Mendapatkan detail sekolah berdasarkan ID
    static async getSchoolById(id) {
        const result = await query(
            `SELECT s.*, k.nama_kecamatan,
        (SELECT nilai_skor FROM skor_risiko_sekolah 
         WHERE sekolah_id = s.id 
         ORDER BY waktu_perhitungan DESC LIMIT 1) as risk_score,
        (SELECT kategori_risiko FROM skor_risiko_sekolah 
         WHERE sekolah_id = s.id 
         ORDER BY waktu_perhitungan DESC LIMIT 1) as risk_category,
        (SELECT waktu_perhitungan FROM skor_risiko_sekolah 
         WHERE sekolah_id = s.id 
         ORDER BY waktu_perhitungan DESC LIMIT 1) as last_computed
       FROM sekolah s
       LEFT JOIN kecamatan k ON s.kecamatan_id = k.id
       WHERE s.id = $1`,
            [id]
        );

        if (result.rows.length === 0) return null;

        return mapSchoolDBToModel(result.rows[0]);
    }

    // Verifikasi sekolah
    static async verifySchool(id) {
        const result = await query(
            `UPDATE sekolah 
       SET data_terverifikasi = true, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) return null;

        return mapSchoolDBToModel(result.rows[0]);
    }

    // Update data sekolah
    static async updateSchool(id, data) {
        const fields = [];
        const values = [];
        let paramIndex = 1;

        const allowedFields = {
            nama_sekolah: 'name',
            npsn: 'npsn',
            kecamatan_id: 'districtId',
            jenjang: 'level',
            akreditasi: 'accreditation',
            jumlah_siswa: 'studentCount',
            jumlah_siswa_rentan: 'vulnerableStudentCount',
            jumlah_penerima_pip: 'pipRecipientCount',
            jumlah_guru: 'teacherCount',
            jumlah_ruang_kelas: 'classroomCount',
            kondisi_bangunan: 'buildingCondition',
            latitude: 'latitude',
            longitude: 'longitude',
            alamat_lengkap: 'address',
            nomor_telepon: 'phone',
            email_sekolah: 'email',
            nama_kepala_sekolah: 'principalName',
            status_operasional: 'status'
        };

        for (const [dbField, modelField] of Object.entries(allowedFields)) {
            if (data[modelField] !== undefined) {
                fields.push(`${dbField} = $${paramIndex++}`);
                values.push(data[modelField]);
            }
        }

        if (fields.length === 0) return null;

        values.push(id);
        fields.push('updated_at = CURRENT_TIMESTAMP');

        const result = await query(
            `UPDATE sekolah SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
            values
        );

        if (result.rows.length === 0) return null;

        return mapSchoolDBToModel(result.rows[0]);
    }
}

module.exports = SchoolService;