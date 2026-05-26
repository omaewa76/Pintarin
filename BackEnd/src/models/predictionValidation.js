// src/models/PredictionValidation.js

const BaseModel = require('./base');
const { query } = require('../../config/db.config');

// Model untuk menyimpan validasi hasil prediksi risiko kecamatan oleh petugas
class PredictionValidationModel extends BaseModel {
    static tableName = 'prediction_validations';
    static primaryKey = 'id';

    static async create(data) {
        const { predictionId, officerId, action, reason, correctedLabel } = data;
        const result = await query(`
            INSERT INTO ${this.tableName}
                (prediction_id, officer_id, action, reason, corrected_label)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [predictionId, officerId, action, reason || null, correctedLabel || null]);
        return result.rows[0];
    }

    static async getHistoryByPredictionId(predictionId) {
        const result = await query(`
            SELECT 
                pv.*, 
                u.nama_lengkap AS officer_name
            FROM ${this.tableName} pv
            LEFT JOIN pengguna u ON pv.officer_id = u.id
            WHERE pv.prediction_id = $1
            ORDER BY pv.validated_at DESC
        `, [predictionId]);
        return result.rows;
    }

    static async getStatistics() {
        const result = await query(`
            SELECT 
                COUNT(*) as total_validations,
                COUNT(CASE WHEN action = 'approve' THEN 1 END) as total_approved,
                COUNT(CASE WHEN action = 'override' THEN 1 END) as total_overridden,
                COUNT(CASE WHEN action = 'flag_for_review' THEN 1 END) as total_flagged,
                COUNT(DISTINCT officer_id) as total_officers,
                DATE(validated_at) as date
            FROM ${this.tableName}
            GROUP BY DATE(validated_at)
            ORDER BY DATE(validated_at) DESC
            LIMIT 30
        `);
        return result.rows;
    }

    static async getStatisticsByOfficer() {
        const result = await query(`
            SELECT 
                pv.officer_id,
                u.nama_lengkap as officer_name,
                COUNT(*) as total_validations,
                COUNT(CASE WHEN pv.action = 'approve' THEN 1 END) as total_approved,
                COUNT(CASE WHEN pv.action = 'override' THEN 1 END) as total_overridden,
                COUNT(CASE WHEN pv.action = 'flag_for_review' THEN 1 END) as total_flagged
            FROM ${this.tableName} pv
            LEFT JOIN pengguna u ON pv.officer_id = u.id
            GROUP BY pv.officer_id, u.nama_lengkap
            ORDER BY total_validations DESC
        `);
        return result.rows;
    }
}

module.exports = PredictionValidationModel;