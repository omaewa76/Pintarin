// src/services/postgres/PredictionService.js

const { query } = require('../../../config/db.config');
const {
    mapDistrictRiskWithConfidenceDBToModel,
    mapPredictionValidationDBToModel,
} = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');

class PredictionService {
    // Mendapatkan semua prediksi yang perlu review manual
    static async getPendingReviews() {
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
        dr.waktu_perhitungan AS created_at
      FROM skor_risiko_kecamatan dr
      JOIN kecamatan k ON dr.kecamatan_id = k.id
      WHERE dr.needs_human_review = true
        AND dr.is_human_validated = false
      ORDER BY dr.rata_rata_skor DESC
    `);

        return result.rows.map(mapDistrictRiskWithConfidenceDBToModel);
    }

    // Mendapatkan detail satu prediksi berdasarkan ID
    static async getPredictionById(id) {
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
      FROM skor_risiko_kecamatan dr
      JOIN kecamatan k ON dr.kecamatan_id = k.id
      WHERE dr.id = $1
    `, [id]);

        if (result.rows.length === 0) return null;
        return mapDistrictRiskWithConfidenceDBToModel(result.rows[0]);
    }

    // Menyimpan record validasi
    static async createValidationRecord(data) {
        const { predictionId, officerId, action, reason, correctedLabel } = data;

        const result = await query(`
      INSERT INTO prediction_validations
        (prediction_id, officer_id, action, reason, corrected_label)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [predictionId, officerId, action, reason || null, correctedLabel || null]);

        return mapPredictionValidationDBToModel(result.rows[0]);
    }

    // Update prediksi dengan hasil override
    static async updatePredictionWithOverride(id, data) {
        const { finalLabel, validationNote } = data;

        const result = await query(`
      UPDATE skor_risiko_kecamatan SET
        final_label = $1,
        is_human_validated = true,
        validation_note = $2
      WHERE id = $3
      RETURNING *
    `, [finalLabel, validationNote || null, id]);

        if (result.rows.length === 0) return null;
        return mapDistrictRiskWithConfidenceDBToModel(result.rows[0]);
    }

    // Update prediksi dengan hasil approve
    static async updatePredictionWithApprove(id, validationNote) {
        const result = await query(`
      UPDATE skor_risiko_kecamatan SET
        is_human_validated = true,
        final_label = kategori_risiko,
        validation_note = $1
      WHERE id = $2
      RETURNING *
    `, [validationNote || null, id]);

        if (result.rows.length === 0) return null;
        return mapDistrictRiskWithConfidenceDBToModel(result.rows[0]);
    }

    // Update prediksi dengan hasil flag for review
    static async updatePredictionWithFlag(id, validationNote) {
        const result = await query(`
      UPDATE skor_risiko_kecamatan SET
        needs_human_review = true,
        validation_note = $1
      WHERE id = $2
      RETURNING *
    `, [validationNote || null, id]);

        if (result.rows.length === 0) return null;
        return mapDistrictRiskWithConfidenceDBToModel(result.rows[0]);
    }

    // Mendapatkan riwayat validasi untuk satu prediksi
    static async getValidationHistory(predictionId) {
        const result = await query(`
      SELECT 
        pv.*, 
        u.nama_lengkap AS officer_name
      FROM prediction_validations pv
      LEFT JOIN pengguna u ON pv.officer_id = u.id
      WHERE pv.prediction_id = $1
      ORDER BY pv.validated_at DESC
    `, [predictionId]);

        return result.rows.map(mapPredictionValidationDBToModel);
    }

    // Mendapatkan statistik validasi
    static async getValidationStats() {
        const result = await query(`
      SELECT 
        COUNT(CASE WHEN needs_human_review = true AND is_human_validated = false THEN 1 END) AS pending_review,
        COUNT(CASE WHEN is_human_validated = true THEN 1 END) AS total_validated,
        COUNT(CASE WHEN pv.action = 'approve' THEN 1 END) AS total_approved,
        COUNT(CASE WHEN pv.action = 'override' THEN 1 END) AS total_overridden,
        COUNT(CASE WHEN pv.action = 'flag_for_review' THEN 1 END) AS total_flagged,
        ROUND(COALESCE(AVG(CASE WHEN pv.action = 'override' THEN 1 ELSE 0 END) * 100, 0), 2) AS override_rate
      FROM skor_risiko_kecamatan dr
      LEFT JOIN prediction_validations pv ON dr.id = pv.prediction_id
      WHERE dr.needs_human_review = true
    `);

        return result.rows[0];
    }

    // Mendapatkan prediksi terbaru untuk semua kecamatan
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
      FROM skor_risiko_kecamatan dr
      JOIN kecamatan k ON dr.kecamatan_id = k.id
      WHERE dr.waktu_perhitungan = (
        SELECT MAX(waktu_perhitungan) 
        FROM skor_risiko_kecamatan dr2 
        WHERE dr2.kecamatan_id = dr.kecamatan_id
      )
      ORDER BY dr.rata_rata_skor DESC
      LIMIT $1
    `, [limit]);

        return result.rows.map(mapDistrictRiskWithConfidenceDBToModel);
    }

    // Validasi bahwa prediksi dengan ID tertentu ada
    static async validatePredictionExists(id) {
        const prediction = await this.getPredictionById(id);
        if (!prediction) {
            throw new InvariantError('Prediksi tidak ditemukan', 404);
        }
        return prediction;
    }
}

module.exports = PredictionService;