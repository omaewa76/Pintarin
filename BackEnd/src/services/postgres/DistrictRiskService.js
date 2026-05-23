// src/services/postgres/DistrictRiskService.js

const { query } = require('../../../config/db.config');
const { mapDistrictRiskDBToModel } = require('../../utils');

class DistrictRiskService {
    // Mendapatkan semua skor risiko kecamatan terbaru
    static async getAllLatestDistrictRisks() {
        const result = await query(
            `SELECT dr.*, k.nama_kecamatan
       FROM skor_risiko_kecamatan dr
       JOIN kecamatan k ON dr.kecamatan_id = k.id
       WHERE (dr.kecamatan_id, dr.waktu_perhitungan) IN (
         SELECT kecamatan_id, MAX(waktu_perhitungan)
         FROM skor_risiko_kecamatan
         GROUP BY kecamatan_id
       )
       ORDER BY dr.rata_rata_skor DESC`
        );

        return result.rows.map(mapDistrictRiskDBToModel);
    }

    // Mendapatkan skor risiko kecamatan berdasarkan ID
    static async getDistrictRiskHistory(districtId, limit = 30) {
        const result = await query(
            `SELECT dr.*, k.nama_kecamatan
       FROM skor_risiko_kecamatan dr
       JOIN kecamatan k ON dr.kecamatan_id = k.id
       WHERE dr.kecamatan_id = $1
       ORDER BY dr.waktu_perhitungan DESC
       LIMIT $2`,
            [districtId, limit]
        );

        return result.rows.map(mapDistrictRiskDBToModel);
    }

    // Membuat skor risiko kecamatan baru
    static async createDistrictRisk(data) {
        const { districtId, averageScore, highRiskCount, modelVersion } = data;

        const result = await query(
            `INSERT INTO skor_risiko_kecamatan 
       (kecamatan_id, rata_rata_skor, jumlah_risiko_tinggi, versi_model_ai)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
            [districtId, averageScore, highRiskCount, modelVersion]
        );

        const districtResult = await query(
            `SELECT nama_kecamatan FROM kecamatan WHERE id = $1`,
            [districtId]
        );

        const row = { ...result.rows[0], nama_kecamatan: districtResult.rows[0]?.nama_kecamatan };

        return mapDistrictRiskDBToModel(row);
    }

    // Ranking kecamatan berdasarkan risiko
    static async getDistrictRanking() {
        const result = await query(`
      SELECT 
        k.id,
        k.nama_kecamatan,
        COALESCE(dr.rata_rata_skor, 0) as risk_score,
        RANK() OVER (ORDER BY COALESCE(dr.rata_rata_skor, 0) DESC) as rank
      FROM kecamatan k
      LEFT JOIN (
        SELECT DISTINCT ON (kecamatan_id) kecamatan_id, rata_rata_skor
        FROM skor_risiko_kecamatan
        ORDER BY kecamatan_id, waktu_perhitungan DESC
      ) dr ON k.id = dr.kecamatan_id
      ORDER BY risk_score DESC
    `);

        return result.rows;
    }
}

module.exports = DistrictRiskService;