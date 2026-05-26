// src/models/DistrictRisk.js

const BaseModel = require('./base');
const { query } = require('../../config/db.config');

// Model untuk menyimpan skor risiko kecamatan berdasarkan hasil prediksi dan perhitungan
class DistrictRiskModel extends BaseModel {
    static tableName = 'skor_risiko_kecamatan';
    static primaryKey = 'id';

    static async getLatestRisks() {
        const result = await query(`
            SELECT dr.*, k.nama_kecamatan
            FROM ${this.tableName} dr
            JOIN kecamatan k ON dr.kecamatan_id = k.id
            WHERE (dr.kecamatan_id, dr.waktu_perhitungan) IN (
                SELECT kecamatan_id, MAX(waktu_perhitungan)
                FROM ${this.tableName}
                GROUP BY kecamatan_id
            )
            ORDER BY dr.rata_rata_skor DESC
        `);
        return result.rows;
    }

    static async getHistory(districtId, limit = 30) {
        const result = await query(
            `SELECT dr.*, k.nama_kecamatan
             FROM ${this.tableName} dr
             JOIN kecamatan k ON dr.kecamatan_id = k.id
             WHERE dr.kecamatan_id = $1
             ORDER BY dr.waktu_perhitungan DESC
             LIMIT $2`,
            [districtId, limit]
        );
        return result.rows;
    }

    static async getRanking() {
        const result = await query(`
            SELECT 
                k.id,
                k.nama_kecamatan,
                COALESCE(dr.rata_rata_skor, 0) as risk_score,
                RANK() OVER (ORDER BY COALESCE(dr.rata_rata_skor, 0) DESC) as rank
            FROM kecamatan k
            LEFT JOIN (
                SELECT DISTINCT ON (kecamatan_id) kecamatan_id, rata_rata_skor
                FROM ${this.tableName}
                ORDER BY kecamatan_id, waktu_perhitungan DESC
            ) dr ON k.id = dr.kecamatan_id
            ORDER BY risk_score DESC
        `);
        return result.rows;
    }

    static async getPendingReviews() {
        const result = await query(`
            SELECT
                dr.id,
                dr.kecamatan_id,
                k.nama_kecamatan,
                dr.kategori_risiko as predicted_label,
                dr.final_label,
                dr.confidence_score,
                dr.confidence_level,
                dr.rata_rata_skor as risk_score,
                dr.needs_human_review,
                dr.is_human_validated,
                dr.waktu_perhitungan as created_at
            FROM ${this.tableName} dr
            JOIN kecamatan k ON dr.kecamatan_id = k.id
            WHERE dr.needs_human_review = true
                AND dr.is_human_validated = false
            ORDER BY dr.rata_rata_skor DESC
        `);
        return result.rows;
    }
}

module.exports = DistrictRiskModel;