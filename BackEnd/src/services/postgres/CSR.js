// src/services/postgres/CSR.js

const { query } = require('../../../config/db.config');
const {
    mapDistrictForCSRDBToModel,
    mapCSRMatchLogDBToModel,
} = require('../../utils');

class CSRService {
    // Membangun alasan rekomendasi berdasarkan data kecamatan
    static buildReason(district) {
        const reasons = [];

        if (district.riskLabel === 'Tinggi') {
            reasons.push(`Risiko pendidikan tinggi (score: ${district.riskScore?.toFixed(1)})`);
        }
        if (district.totalSd < 10) {
            reasons.push(`Jumlah SD terbatas (${district.totalSd} sekolah)`);
        }
        if (district.rasioPip < 15) {
            reasons.push(`Coverage PIP rendah (${district.rasioPip?.toFixed(1)}%)`);
        }

        return reasons.length > 0 ? reasons.join(', ') : 'Kebutuhan menyeluruh di semua aspek';
    }

    // Menghitung match score berdasarkan data kecamatan dan fokus area
    static calculateMatchScore(district, focusArea) {
        let matchScore = (district.riskScore || 0) * 0.4; // base: 40% dari risk score

        switch (focusArea) {
            case 'infrastruktur_sd':
                if (district.totalSd < 10) matchScore += 35;
                if (district.totalSd < 5) matchScore += 15;
                break;

            case 'beasiswa':
                if (district.rasioPip < 15) matchScore += 30;
                if (district.rasioPip < 10) matchScore += 15;
                break;

            case 'angka_putus_sekolah':
                if (district.riskLabel === 'Tinggi') matchScore += 40;
                if (district.riskLabel === 'Sedang') matchScore += 15;
                break;

            case 'umum':
            default:
                if (district.riskLabel === 'Tinggi') matchScore += 20;
                if (district.totalSd < 10) matchScore += 10;
                if (district.rasioPip < 15) matchScore += 10;
                break;
        }

        return Math.min(Math.round(matchScore), 100);
    }

    // Mendapatkan daftar kecamatan dengan skor risiko terbaru
    static async getAllDistrictsWithLatestRisk() {
        const result = await query(`
      SELECT
        dr.id,
        dr.kecamatan_id,
        k.nama_kecamatan,
        dr.final_label AS risk_label,
        dr.rata_rata_skor AS risk_score,
        dr.confidence_score,
        COALESCE(s.total_sd, 0) AS total_sd,
        COALESCE(s.rasio_pip, 0) AS rasio_pip_per_rentan,
        COALESCE(s.total_warga_rentan, 0) AS total_warga_rentan
      FROM skor_risiko_kecamatan dr
      JOIN kecamatan k ON dr.kecamatan_id = k.id
      LEFT JOIN (
        SELECT 
          kecamatan_id,
          COUNT(*) AS total_sd,
          AVG(CASE WHEN jumlah_siswa > 0 THEN jumlah_siswa_rentan::float / jumlah_siswa * 100 ELSE 0 END) AS rasio_pip,
          SUM(jumlah_siswa_rentan) AS total_warga_rentan
        FROM sekolah
        WHERE status_operasional = 'Aktif'
        GROUP BY kecamatan_id
      ) s ON dr.kecamatan_id = s.kecamatan_id
      WHERE dr.waktu_perhitungan = (
        SELECT MAX(waktu_perhitungan) 
        FROM skor_risiko_kecamatan dr2 
        WHERE dr2.kecamatan_id = dr.kecamatan_id
      )
      ORDER BY dr.rata_rata_skor DESC
    `);

        return result.rows.map(mapDistrictForCSRDBToModel);
    }

    // Mendapatkan rekomendasi kecamatan berdasarkan fokus area dan budget
    static async getMatchingRecommendations(params) {
        const { focusArea = 'umum', budgetRange = 'semua', userId = null } = params;

        // Dapatkan data semua kecamatan dengan skor risiko terbaru
        const districts = await this.getAllDistrictsWithLatestRisk();

        // Kalkulasi match score dan alasan untuk setiap kecamatan
        const scored = districts.map(district => ({
            kecamatan_id: district.districtId,
            nama_kecamatan: district.districtName,
            risk_label: district.riskLabel,
            risk_score: district.riskScore,
            total_sd: district.totalSd,
            rasio_pip: district.rasioPip,
            total_warga_rentan: district.totalWargaRentan,
            match_score: this.calculateMatchScore(district, focusArea),
            confidence_score: district.confidenceScore,
            alasan: this.buildReason(district, focusArea),
        }));

        // Dapatkan top 5 kecamatan dengan match score tertinggi
        const top5 = scored
            .sort((a, b) => b.match_score - a.match_score)
            .slice(0, 5);

        // Simpan log aktivitas matching
        await this.saveMatchLog({
            focusArea,
            budgetRange,
            userId,
            results: top5,
        });

        return {
            focus_area: focusArea,
            budget_range: budgetRange,
            recommended: top5,
            generated_at: new Date().toISOString(),
        };
    }

    // Menyimpan log aktivitas CSR matching
    static async saveMatchLog(data) {
        const { focusArea, budgetRange, userId, results } = data;

        const result = await query(`
      INSERT INTO csr_match_logs (focus_area, budget_range, user_id, results_json)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [focusArea, budgetRange, userId || null, JSON.stringify(results)]);

        return mapCSRMatchLogDBToModel(result.rows[0]);
    }

    // Mendapatkan riwayat pencocokan CSR untuk seorang user
    static async getMatchHistory(userId, limit = 10) {
        const result = await query(`
      SELECT 
        id,
        focus_area,
        budget_range,
        results_json,
        created_at
      FROM csr_match_logs
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2
    `, [userId, limit]);

        return result.rows.map(mapCSRMatchLogDBToModel);
    }
}

module.exports = CSRService;