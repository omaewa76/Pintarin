// src/models/RiskScoreModel.js

const BaseModel = require('./base');
const { query } = require('../../config/db.config');

// Model untuk menyimpan skor risiko sekolah berdasarkan hasil prediksi dan perhitungan
class RiskScoreModel extends BaseModel {
    static tableName = 'skor_risiko_sekolah';
    static primaryKey = 'id';

    // Fungsi untuk mengambil skor risiko terkini untuk semua sekolah dengan dukungan pagination untuk mengelola jumlah data yang diambil dalam satu permintaan, serta menyertakan informasi nama sekolah dan skor risiko terkini
    static async getLatestBySchoolId(schoolId) {
        const result = await query(`
            SELECT rs.*, s.nama_sekolah
            FROM ${this.tableName} rs
            JOIN sekolah s ON rs.sekolah_id = s.id
            WHERE rs.sekolah_id = $1
            ORDER BY rs.waktu_perhitungan DESC
            LIMIT 1
        `, [schoolId]);
        return result.rows[0] || null;
    }

    static async getHistory(schoolId, limit = 30) {
        const result = await query(`
            SELECT rs.*, s.nama_sekolah
            FROM ${this.tableName} rs
            JOIN sekolah s ON rs.sekolah_id = s.id
            WHERE rs.sekolah_id = $1
            ORDER BY rs.waktu_perhitungan DESC
            LIMIT $2
        `, [schoolId, limit]);
        return result.rows;
    }

    // Fungsi untuk mengambil statistik skor risiko berdasarkan ID sekolah, dengan menghitung total jumlah perhitungan skor risiko yang telah dilakukan untuk sekolah tersebut, serta menghitung rata-rata skor risiko, jumlah perhitungan yang masuk dalam kategori risiko tinggi, sedang, dan rendah, dan mengembalikan data dalam bentuk objek yang berisi informasi statistik yang terkait dengan sekolah tersebut
    static async getStatistics() {
        const result = await query(`
            SELECT 
                COUNT(DISTINCT sekolah_id) as total_schools_with_risk,
                COUNT(CASE WHEN kategori_risiko = 'Tinggi' THEN 1 END) as high_risk_count,
                COUNT(CASE WHEN kategori_risiko = 'Sedang' THEN 1 END) as medium_risk_count,
                COUNT(CASE WHEN kategori_risiko = 'Rendah' THEN 1 END) as low_risk_count,
                AVG(nilai_skor) as average_score
            FROM (
                SELECT DISTINCT ON (sekolah_id) sekolah_id, nilai_skor, kategori_risiko
                FROM ${this.tableName}
                ORDER BY sekolah_id, waktu_perhitungan DESC
            ) as latest_risks
        `);
        return result.rows[0];
    }
}

module.exports = RiskScoreModel;