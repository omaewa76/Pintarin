const { query } = require('../../../config/db.config');
const { mapAssistanceRequestDBToModel } = require('../../utils');

class AssistanceRequestService {
    // Mendapatkan semua pengajuan bantuan dengan filter
    static async getAllRequests({
        status,
        schoolId,
        csrCompanyId,
        page = 1,
        limit = 20
    } = {}) {
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
            `SELECT COUNT(*) as total FROM pengajuan_bantuan pb ${whereClause}`,
            params
        );
        const total = parseInt(countResult.rows[0].total);

        const offset = (page - 1) * limit;
        params.push(limit, offset);

        const result = await query(
            `SELECT pb.*, 
        pc.nama_perusahaan, 
        s.nama_sekolah,
        u.nama_lengkap as nama_verifikator
       FROM pengajuan_bantuan pb
       LEFT JOIN perusahaan_csr pc ON pb.perusahaan_csr_id = pc.id
       LEFT JOIN sekolah s ON pb.sekolah_id = s.id
       LEFT JOIN pengguna u ON pb.diverifikasi_oleh = u.id
       ${whereClause}
       ORDER BY pb.created_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
            params
        );

        const data = result.rows.map(mapAssistanceRequestDBToModel);

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

    // Mendapatkan detail pengajuan bantuan
    static async getRequestById(id) {
        const result = await query(
            `SELECT pb.*, 
        pc.nama_perusahaan, 
        s.nama_sekolah,
        u.nama_lengkap as nama_verifikator
       FROM pengajuan_bantuan pb
       LEFT JOIN perusahaan_csr pc ON pb.perusahaan_csr_id = pc.id
       LEFT JOIN sekolah s ON pb.sekolah_id = s.id
       LEFT JOIN pengguna u ON pb.diverifikasi_oleh = u.id
       WHERE pb.id = $1`,
            [id]
        );

        if (result.rows.length === 0) return null;

        return mapAssistanceRequestDBToModel(result.rows[0]);
    }

    // Membuat pengajuan bantuan baru
    static async createRequest(data) {
        const { csrCompanyId, schoolId, type, description, amount } = data;

        const result = await query(
            `INSERT INTO pengajuan_bantuan 
       (perusahaan_csr_id, sekolah_id, jenis_bantuan, deskripsi, nominal_rupiah)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
            [csrCompanyId, schoolId, type, description, amount]
        );

        const detailResult = await query(
            `SELECT pb.*, pc.nama_perusahaan, s.nama_sekolah
       FROM pengajuan_bantuan pb
       LEFT JOIN perusahaan_csr pc ON pb.perusahaan_csr_id = pc.id
       LEFT JOIN sekolah s ON pb.sekolah_id = s.id
       WHERE pb.id = $1`,
            [result.rows[0].id]
        );

        return mapAssistanceRequestDBToModel(detailResult.rows[0]);
    }

    // Approve pengajuan bantuan
    static async approveRequest(id, reviewerId) {
        const result = await query(
            `UPDATE pengajuan_bantuan 
       SET status_pengajuan = 'Approved', 
           diverifikasi_oleh = $2, 
           waktu_verifikasi = CURRENT_TIMESTAMP,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
            [id, reviewerId]
        );

        if (result.rows.length === 0) return null;

        const detailResult = await query(
            `SELECT pb.*, pc.nama_perusahaan, s.nama_sekolah, u.nama_lengkap as nama_verifikator
       FROM pengajuan_bantuan pb
       LEFT JOIN perusahaan_csr pc ON pb.perusahaan_csr_id = pc.id
       LEFT JOIN sekolah s ON pb.sekolah_id = s.id
       LEFT JOIN pengguna u ON pb.diverifikasi_oleh = u.id
       WHERE pb.id = $1`,
            [id]
        );

        return mapAssistanceRequestDBToModel(detailResult.rows[0]);
    }

    // Reject pengajuan bantuan
    static async rejectRequest(id, reviewerId, rejectionReason) {
        const result = await query(
            `UPDATE pengajuan_bantuan 
       SET status_pengajuan = 'Rejected', 
           diverifikasi_oleh = $2, 
           waktu_verifikasi = CURRENT_TIMESTAMP,
           alasan_ditolak = $3,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
            [id, reviewerId, rejectionReason]
        );

        if (result.rows.length === 0) return null;

        const detailResult = await query(
            `SELECT pb.*, pc.nama_perusahaan, s.nama_sekolah, u.nama_lengkap as nama_verifikator
       FROM pengajuan_bantuan pb
       LEFT JOIN perusahaan_csr pc ON pb.perusahaan_csr_id = pc.id
       LEFT JOIN sekolah s ON pb.sekolah_id = s.id
       LEFT JOIN pengguna u ON pb.diverifikasi_oleh = u.id
       WHERE pb.id = $1`,
            [id]
        );

        return mapAssistanceRequestDBToModel(detailResult.rows[0]);
    }

    // Mendapatkan statistik bantuan
    static async getAssistanceStatistics() {
        const result = await query(`
      SELECT 
        COUNT(*) as total_requests,
        COUNT(CASE WHEN status_pengajuan = 'Approved' THEN 1 END) as approved,
        COUNT(CASE WHEN status_pengajuan = 'Pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status_pengajuan = 'Completed' THEN 1 END) as completed,
        SUM(CASE WHEN status_pengajuan = 'Approved' THEN nominal_rupiah ELSE 0 END) as total_amount
      FROM pengajuan_bantuan
    `);

        return result.rows[0];
    }
}

module.exports = AssistanceRequestService;