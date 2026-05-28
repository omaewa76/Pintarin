// src/models/AssistanceRequestModel.js

const BaseModel = require('./base');
const { query } = require('../../config/db.config');

// Model untuk pengajuan bantuan CSR oleh sekolah
class AssistanceRequestModel extends BaseModel {
    static tableName = 'pengajuan_bantuan';
    static primaryKey = 'id';

    // Fungsi untuk mengambil semua pengajuan bantuan dengan detail informasi perusahaan CSR, sekolah, dan verifikator, serta mendukung filter berdasarkan status, sekolah, dan perusahaan CSR, serta pagination untuk mengelola jumlah data yang diambil dalam satu permintaan
    static async findAllWithDetails(options = {}) {
        const { status, schoolId, csrCompanyId, page = 1, limit = 20 } = options;
        const offset = (page - 1) * limit;
        const conditions = [];
        const params = [];

        let paramIndex = 1;
        if (status) {
            conditions.push(`pb.status_pengajuan = $${paramIndex++}`);
            params.push(status);
        }
        if (schoolId) {
            conditions.push(`pb.sekolah_id = $${paramIndex++}`);
            params.push(schoolId);
        }
        if (csrCompanyId) {
            conditions.push(`pb.perusahaan_csr_id = $${paramIndex++}`);
            params.push(csrCompanyId);
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        const countResult = await query(
            `SELECT COUNT(*) as total FROM ${this.tableName} pb ${whereClause}`,
            params
        );
        const total = parseInt(countResult.rows[0].total);

        params.push(limit, offset);

        // Ambil data pengajuan bantuan dengan join ke tabel perusahaan CSR, sekolah, dan pengguna untuk mendapatkan nama verifikator, serta mendukung filter dan pagination sesuai dengan parameter yang diberikan
        const result = await query(`
            SELECT pb.*, 
                pc.nama_perusahaan, 
                s.nama_sekolah,
                u.nama_lengkap as nama_verifikator
            FROM ${this.tableName} pb
            LEFT JOIN perusahaan_csr pc ON pb.perusahaan_csr_id = pc.id
            LEFT JOIN sekolah s ON pb.sekolah_id = s.id
            LEFT JOIN pengguna u ON pb.diverifikasi_oleh = u.id
            ${whereClause}
            ORDER BY pb.created_at DESC
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

    // Fungsi untuk mengambil detail pengajuan bantuan berdasarkan ID, termasuk informasi perusahaan CSR, sekolah, dan verifikator yang terkait dengan pengajuan tersebut
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

    // Fungsi untuk menolak pengajuan bantuan berdasarkan ID, termasuk menyimpan alasan penolakan dan informasi
    static async reject(id, reviewerId, reason) {
        const result = await query(`
            UPDATE ${this.tableName} 
            SET status_pengajuan = 'Rejected', 
                diverifikasi_oleh = $2, 
                waktu_verifikasi = CURRENT_TIMESTAMP,
                alasan_ditolak = $3
            WHERE id = $1
            RETURNING *
        `, [id, reviewerId, reason]);
        return result.rows[0] || null;
    }
}

module.exports = AssistanceRequestModel;