// src/models/School.js

const BaseModel = require('./base');
const { query } = require('../../config/db.config');

// Model untuk data sekolah dan informasi terkait
class SchoolModel extends BaseModel {
    static tableName = 'sekolah';
    static primaryKey = 'id';

    // Fungsi untuk mengambil detail sekolah berdasarkan ID, dengan join ke tabel kecamatan untuk mendapatkan nama kecamatan terkait, serta menyertakan informasi skor risiko terkini dan kategori risiko jika tersedia
    static async findAllWithDistrict(options = {}) {
        const {
            page = 1,
            limit = 20,
            districtId,
            level,
            status,
            search,
        } = options;
        const offset = (page - 1) * limit;
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
        if (search) {
            conditions.push(`(s.nama_sekolah ILIKE $${paramIndex++} OR s.npsn ILIKE $${paramIndex++})`);
            params.push(`%${search}%`, `%${search}%`);
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        const countResult = await query(
            `SELECT COUNT(*) as total FROM ${this.tableName} s ${whereClause}`,
            params
        );
        const total = parseInt(countResult.rows[0].total);

        params.push(limit, offset);

        const result = await query(
            `SELECT s.*, k.nama_kecamatan 
             FROM ${this.tableName} s
             LEFT JOIN kecamatan k ON s.kecamatan_id = k.id
             ${whereClause}
             ORDER BY s.id
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

    // Fungsi untuk mengambil detail sekolah berdasarkan ID, dengan join ke tabel kecamatan untuk mendapatkan nama kecamatan terkait, serta menyertakan informasi skor risiko terkini dan kategori risiko jika tersedia untuk memberikan gambaran lengkap tentang kondisi sekolah tersebut dalam konteks risiko yang mungkin dihadapi, sehingga dapat membantu dalam pengambilan keputusan terkait intervensi atau bantuan yang diperlukan
    static async findByIdWithRisk(id) {
        const result = await query(
            `SELECT s.*, k.nama_kecamatan,
                (SELECT nilai_skor FROM skor_risiko_sekolah 
                 WHERE sekolah_id = s.id ORDER BY waktu_perhitungan DESC LIMIT 1) as risk_score,
                (SELECT kategori_risiko FROM skor_risiko_sekolah 
                 WHERE sekolah_id = s.id ORDER BY waktu_perhitungan DESC LIMIT 1) as risk_category
             FROM ${this.tableName} s
             LEFT JOIN kecamatan k ON s.kecamatan_id = k.id
             WHERE s.id = $1`,
            [id]
        );
        return result.rows[0] || null;
    }

    // Fungsi untuk mengambil detail sekolah berdasarkan ID pengguna yang terkait, dengan join ke tabel kecamatan untuk mendapatkan nama kecamatan terkait, serta menyertakan informasi skor risiko terkini dan kategori risiko jika tersedia untuk memberikan gambaran lengkap tentang kondisi sekolah tersebut dalam konteks risiko yang mungkin dihadapi, sehingga dapat membantu dalam pengambilan keputusan terkait intervensi atau bantuan yang diperlukan, serta memastikan bahwa hanya sekolah yang terkait dengan pengguna tersebut yang dapat diakses
    static async findByUserId(userId) {
        const result = await query(
            `SELECT s.*, k.nama_kecamatan 
             FROM ${this.tableName} s
             LEFT JOIN kecamatan k ON s.kecamatan_id = k.id
             WHERE s.user_id = $1`,
            [userId]
        );
        return result.rows[0] || null;
    }

    static async verify(id) {
        const result = await query(
            `UPDATE ${this.tableName} SET data_terverifikasi = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rows[0] || null;
    }

    // Fungsi untuk mengambil statistik sekolah secara keseluruhan, dengan menghitung total jumlah sekolah, jumlah sekolah yang masih aktif, jumlah sekolah yang datanya sudah terverifikasi, serta jumlah kecamatan yang memiliki sekolah, sehingga dapat memberikan gambaran umum tentang kondisi sekolah di wilayah tersebut dan potensi kebutuhan bantuan CSR yang mungkin diperlukan
    static async getStatistics() {
        const result = await query(`
            SELECT 
                COUNT(*) as total_schools,
                COUNT(CASE WHEN status_operasional = 'Aktif' THEN 1 END) as active_schools,
                COUNT(CASE WHEN data_terverifikasi = true THEN 1 END) as verified_schools,
                COUNT(DISTINCT kecamatan_id) as districts_with_schools
            FROM ${this.tableName}
        `);
        return result.rows[0];
    }
}

module.exports = SchoolModel;