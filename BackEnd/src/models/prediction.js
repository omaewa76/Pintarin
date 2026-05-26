// src/models/Prediction.js

const BaseModel = require('./base');
const { query } = require('../../config/db.config');

// Model untuk menyimpan hasil prediksi risiko kecamatan berdasarkan data sekolah dan faktor lainnya
class PredictionModel extends BaseModel {
    static tableName = 'skor_risiko_kecamatan';
    static primaryKey = 'id';

    static async getLatestPredictions(limit = 20) {
        const result = await query(`
            SELECT 
                dr.id,
                dr.kecamatan_id,
                k.nama_kecamatan,
                dr.rata_rata_skor AS risk_score,
                dr.kategori_risiko,
                dr.confidence_score,
                dr.confidence_level,
                dr.needs_human_review,
                dr.is_human_validated,
                dr.final_label,
                dr.waktu_perhitungan AS computed_at
            FROM ${this.tableName} dr
            JOIN kecamatan k ON dr.kecamatan_id = k.id
            WHERE dr.waktu_perhitungan = (
                SELECT MAX(waktu_perhitungan) 
                FROM ${this.tableName} dr2 
                WHERE dr2.kecamatan_id = dr.kecamatan_id
            )
            ORDER BY dr.rata_rata_skor DESC
            LIMIT $1
        `, [limit]);
        return result.rows;
    }

    static async findByIdWithDetails(id) {
        const result = await query(`
            SELECT
                dr.id,
                dr.kecamatan_id,
                k.nama_kecamatan,
                dr.kategori_risiko,
                dr.final_label,
                dr.confidence_score,
                dr.confidence_level,
                dr.rata_rata_skor AS risk_score,
                dr.needs_human_review,
                dr.is_human_validated,
                dr.validation_note,
                dr.waktu_perhitungan AS computed_at
            FROM ${this.tableName} dr
            JOIN kecamatan k ON dr.kecamatan_id = k.id
            WHERE dr.id = $1
        `, [id]);
        return result.rows[0] || null;
    }

    static async approvePrediction(id, validationNote) {
        const result = await query(`
            UPDATE ${this.tableName} SET
                is_human_validated = true,
                final_label = kategori_risiko,
                validation_note = $1,
                needs_human_review = false
            WHERE id = $2
            RETURNING *
        `, [validationNote || null, id]);
        return result.rows[0] || null;
    }

    static async overridePrediction(id, finalLabel, validationNote) {
        const result = await query(`
            UPDATE ${this.tableName} SET
                final_label = $1,
                is_human_validated = true,
                validation_note = $2,
                needs_human_review = false
            WHERE id = $3
            RETURNING *
        `, [finalLabel, validationNote || null, id]);
        return result.rows[0] || null;
    }

    static async flagForReview(id, validationNote) {
        const result = await query(`
            UPDATE ${this.tableName} SET
                needs_human_review = true,
                validation_note = $1
            WHERE id = $2
            RETURNING *
        `, [validationNote || null, id]);
        return result.rows[0] || null;
    }
}

module.exports = PredictionModel;