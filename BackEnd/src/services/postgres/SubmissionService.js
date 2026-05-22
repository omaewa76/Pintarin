const { query } = require('../../../config/db.config');
const { mapSubmissionDBToModel } = require('../../utils');

class SubmissionService {
    // Mendapatkan semua pengajuan perubahan data
    static async getAllSubmissions({ status, page = 1, limit = 20 } = {}) {
        const conditions = [];
        const params = [];
        let paramIndex = 1;

        if (status) {
            conditions.push(`ps.status_pengajuan = $${paramIndex++}`);
            params.push(status);
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        const countResult = await query(
            `SELECT COUNT(*) as total FROM pengajuan_perubahan_data ps ${whereClause}`,
            params
        );
        const total = parseInt(countResult.rows[0].total);

        const offset = (page - 1) * limit;
        params.push(limit, offset);

        const result = await query(
            `SELECT ps.*, 
        s.nama_sekolah,
        u1.nama_lengkap as nama_pengaju,
        u2.nama_lengkap as nama_reviewer
       FROM pengajuan_perubahan_data ps
       LEFT JOIN sekolah s ON ps.sekolah_id = s.id
       LEFT JOIN pengguna u1 ON ps.diajukan_oleh = u1.id
       LEFT JOIN pengguna u2 ON ps.diverifikasi_oleh = u2.id
       ${whereClause}
       ORDER BY ps.created_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
            params
        );

        const data = result.rows.map(mapSubmissionDBToModel);

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

    // Mendapatkan detail submission
    static async getSubmissionById(id) {
        const result = await query(
            `SELECT ps.*, 
        s.nama_sekolah,
        u1.nama_lengkap as nama_pengaju,
        u2.nama_lengkap as nama_reviewer
       FROM pengajuan_perubahan_data ps
       LEFT JOIN sekolah s ON ps.sekolah_id = s.id
       LEFT JOIN pengguna u1 ON ps.diajukan_oleh = u1.id
       LEFT JOIN pengguna u2 ON ps.diverifikasi_oleh = u2.id
       WHERE ps.id = $1`,
            [id]
        );

        if (result.rows.length === 0) return null;

        return mapSubmissionDBToModel(result.rows[0]);
    }

    // Membuat submission baru
    static async createSubmission(data) {
        const { schoolId, submittedBy, updateType, dataAfter, dataBefore } = data;

        const result = await query(
            `INSERT INTO pengajuan_perubahan_data 
       (sekolah_id, diajukan_oleh, jenis_perubahan, data_yang_diajukan, data_sebelumnya)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
            [schoolId, submittedBy, updateType, dataAfter, dataBefore]
        );

        return this.getSubmissionById(result.rows[0].id);
    }

    // Approve submission
    static async approveSubmission(id, reviewerId) {
        // Ambil data submission terlebih dahulu
        const submission = await this.getSubmissionById(id);
        if (!submission) return null;

        // Update status submission
        await query(
            `UPDATE pengajuan_perubahan_data 
       SET status_pengajuan = 'Approved', 
           diverifikasi_oleh = $2, 
           waktu_verifikasi = CURRENT_TIMESTAMP
       WHERE id = $1`,
            [id, reviewerId]
        );

        // Terapkan perubahan ke tabel sekolah
        if (submission.dataAfter) {
            const updateFields = [];
            const updateValues = [];
            let paramIdx = 1;

            // Mapping field dari submission ke tabel sekolah
            const fieldMapping = {
                jumlah_siswa: 'studentCount',
                jumlah_siswa_rentan: 'vulnerableStudentCount',
                jumlah_penerima_pip: 'pipRecipientCount',
                jumlah_guru: 'teacherCount',
                jumlah_ruang_kelas: 'classroomCount',
                kondisi_bangunan: 'buildingCondition',
                alamat_lengkap: 'address',
                nomor_telepon: 'phone',
                email_sekolah: 'email',
                nama_kepala_sekolah: 'principalName'
            };

            for (const [dbField, modelField] of Object.entries(fieldMapping)) {
                if (submission.dataAfter[modelField] !== undefined) {
                    updateFields.push(`${dbField} = $${paramIdx++}`);
                    updateValues.push(submission.dataAfter[modelField]);
                }
            }

            if (updateFields.length > 0) {
                updateValues.push(submission.schoolId);
                await query(
                    `UPDATE sekolah SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
           WHERE id = $${paramIdx}`,
                    updateValues
                );
            }
        }

        return this.getSubmissionById(id);
    }

    // Reject submission
    static async rejectSubmission(id, reviewerId) {
        const result = await query(
            `UPDATE pengajuan_perubahan_data 
       SET status_pengajuan = 'Rejected', 
           diverifikasi_oleh = $2, 
           waktu_verifikasi = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
            [id, reviewerId]
        );

        if (result.rows.length === 0) return null;

        return this.getSubmissionById(id);
    }
}

module.exports = SubmissionService;