const { query } = require('../../../config/db.config');
const { mapRiskScoreDBToModel } = require('../../utils');

class RiskScoreService {
    // Mendapatkan history risiko sekolah
    static async getSchoolRiskHistory(schoolId, limit = 30) {
        const result = await query(
            `SELECT rs.*, s.nama_sekolah
       FROM skor_risiko_sekolah rs
       JOIN sekolah s ON rs.sekolah_id = s.id
       WHERE rs.sekolah_id = $1
       ORDER BY rs.waktu_perhitungan DESC
       LIMIT $2`,
            [schoolId, limit]
        );

        return result.rows.map(mapRiskScoreDBToModel);
    }

    // Mendapatkan skor risiko terbaru sekolah
    static async getLatestRiskScore(schoolId) {
        const result = await query(
            `SELECT rs.*, s.nama_sekolah
       FROM skor_risiko_sekolah rs
       JOIN sekolah s ON rs.sekolah_id = s.id
       WHERE rs.sekolah_id = $1
       ORDER BY rs.waktu_perhitungan DESC
       LIMIT 1`,
            [schoolId]
        );

        if (result.rows.length === 0) return null;

        return mapRiskScoreDBToModel(result.rows[0]);
    }

    // Membuat skor risiko baru
    static async createRiskScore(data) {
        const { schoolId, score, category, modelVersion, featuresSnapshot } = data;

        const result = await query(
            `INSERT INTO skor_risiko_sekolah 
       (sekolah_id, nilai_skor, kategori_risiko, versi_model_ai, data_fitur_saat_itu)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
            [schoolId, score, category, modelVersion, featuresSnapshot]
        );

        const schoolResult = await query(
            `SELECT nama_sekolah FROM sekolah WHERE id = $1`,
            [schoolId]
        );

        const row = { ...result.rows[0], nama_sekolah: schoolResult.rows[0]?.nama_sekolah };

        return mapRiskScoreDBToModel(row);
    }

    // Mendapatkan statistik risiko
    static async getRiskStatistics() {
        const result = await query(`
      SELECT 
        COUNT(DISTINCT sekolah_id) as total_schools_with_risk,
        COUNT(CASE WHEN kategori_risiko = 'Tinggi' THEN 1 END) as high_risk_count,
        COUNT(CASE WHEN kategori_risiko = 'Sedang' THEN 1 END) as medium_risk_count,
        COUNT(CASE WHEN kategori_risiko = 'Rendah' THEN 1 END) as low_risk_count,
        AVG(nilai_skor) as average_score
      FROM (
        SELECT DISTINCT ON (sekolah_id) sekolah_id, nilai_skor, kategori_risiko
        FROM skor_risiko_sekolah
        ORDER BY sekolah_id, waktu_perhitungan DESC
      ) as latest_risks
    `);

        return result.rows[0];
    }
}

module.exports = RiskScoreService;