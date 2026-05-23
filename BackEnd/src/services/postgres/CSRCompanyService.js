// src/services/postgres/CSRCompanyService.js

const { query } = require('../../../config/db.config');
const { mapCSRCompanyDBToModel } = require('../../utils');

class CSRCompanyService {
    // Mendapatkan semua perusahaan CSR
    static async getAllCompanies({ page = 1, limit = 20 } = {}) {
        const offset = (page - 1) * limit;

        const countResult = await query('SELECT COUNT(*) as total FROM perusahaan_csr');
        const total = parseInt(countResult.rows[0].total);

        const result = await query(
            `SELECT * FROM perusahaan_csr
       ORDER BY id
       LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        const data = result.rows.map(mapCSRCompanyDBToModel);

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

    // Mendapatkan detail perusahaan CSR berdasarkan ID
    static async getCompanyById(id) {
        const result = await query(
            `SELECT * FROM perusahaan_csr WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) return null;

        return mapCSRCompanyDBToModel(result.rows[0]);
    }

    // Membuat perusahaan CSR baru
    static async createCompany(data) {
        const { name, industry, contactPerson, contactEmail, contactPhone, address } = data;

        const result = await query(
            `INSERT INTO perusahaan_csr 
       (nama_perusahaan, bidang_usaha, kontak_person, email_kontak, telepon_kontak, alamat_kantor)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
            [name, industry, contactPerson, contactEmail, contactPhone, address]
        );

        return mapCSRCompanyDBToModel(result.rows[0]);
    }

    // Update perusahaan CSR
    static async updateCompany(id, data) {
        const { name, industry, contactPerson, contactEmail, contactPhone, address, isVerified } = data;

        const result = await query(
            `UPDATE perusahaan_csr 
       SET nama_perusahaan = COALESCE($1, nama_perusahaan),
           bidang_usaha = COALESCE($2, bidang_usaha),
           kontak_person = COALESCE($3, kontak_person),
           email_kontak = COALESCE($4, email_kontak),
           telepon_kontak = COALESCE($5, telepon_kontak),
           alamat_kantor = COALESCE($6, alamat_kantor),
           sudah_diverifikasi = COALESCE($7, sudah_diverifikasi),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
            [name, industry, contactPerson, contactEmail, contactPhone, address, isVerified, id]
        );

        if (result.rows.length === 0) return null;

        return mapCSRCompanyDBToModel(result.rows[0]);
    }

    // Verifikasi perusahaan CSR
    static async verifyCompany(id) {
        const result = await query(
            `UPDATE perusahaan_csr 
       SET sudah_diverifikasi = true, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) return null;

        return mapCSRCompanyDBToModel(result.rows[0]);
    }
}

module.exports = CSRCompanyService;