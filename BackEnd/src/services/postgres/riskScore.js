// src/services/postgres/riskScore.js

const { RiskScoreModel, SchoolModel } = require('../../models');
const { mapRiskScoreDBToModel } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');

// Service untuk manajemen skor risiko
class RiskScoreService {
    static async getSchoolRiskHistory(schoolId, limit = 30) {
        const history = await RiskScoreModel.getHistory(schoolId, limit);
        return history.map(mapRiskScoreDBToModel);
    }

    // Fungsi untuk mengambil skor risiko terkini berdasarkan ID sekolah, dengan join ke tabel sekolah untuk mendapatkan nama sekolah terkait, serta menyertakan informasi kategori risiko dan versi model AI yang digunakan untuk memberikan gambaran lengkap tentang profil risiko terkini dari sekolah tersebut
    static async getLatestRiskScore(schoolId) {
        const risk = await RiskScoreModel.getLatestBySchoolId(schoolId);
        if (!risk) return null;
        return mapRiskScoreDBToModel(risk);
    }

    static async createRiskScore(data) {
        const { schoolId, score, category, modelVersion, featuresSnapshot } = data;

        const newRisk = await RiskScoreModel.create({
            sekolah_id: schoolId,
            nilai_skor: score,
            kategori_risiko: category,
            versi_model_ai: modelVersion,
            data_fitur_saat_itu: featuresSnapshot,
        });

        const school = await SchoolModel.findById(schoolId);
        return mapRiskScoreDBToModel({ ...newRisk, nama_sekolah: school?.nama_sekolah });
    }

    // Fungsi untuk mengambil statistik skor risiko berdasarkan ID sekolah, dengan menghitung total jumlah perhitungan skor risiko yang telah dilakukan untuk sekolah tersebut, serta menghitung rata-rata skor risiko, jumlah perhitungan yang masuk dalam kategori risiko tinggi, sedang, dan rendah, dan mengembalikan data dalam bentuk objek yang berisi informasi statistik yang terkait dengan sekolah tersebut
    static async getRiskStatistics() {
        return await RiskScoreModel.getStatistics();
    }

    static async getTopRiskSchools(limit = 5) {
        const risks = await RiskScoreModel.getLatestRisks(limit);
        return risks.map(mapRiskScoreDBToModel);
    }

    static async validateRiskScoreExists(id) {
        const risk = await RiskScoreModel.findById(id);
        if (!risk) {
            throw new InvariantError('Data risiko tidak ditemukan', 404);
        }
        return risk;
    }
}

module.exports = RiskScoreService;