// src/services/postgres/districtRisk.js

const { DistrictRiskModel, DistrictModel } = require('../../models');
const { mapDistrictRiskDBToModel } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');

// Service untuk manajemen risiko kecamatan
class DistrictRiskService {
    static async getAllLatestDistrictRisks() {
        const risks = await DistrictRiskModel.getLatestRisks();
        return risks.map(mapDistrictRiskDBToModel);
    }

    static async getDistrictRiskHistory(districtId, limit = 30) {
        const history = await DistrictRiskModel.getHistory(districtId, limit);
        return history.map(mapDistrictRiskDBToModel);
    }

    // Fungsi untuk membuat record risiko kecamatan baru, dengan menyimpan data risiko ke database dan kemudian mengambil detail record risiko tersebut berdasarkan ID yang baru dibuat, dengan join ke tabel kecamatan untuk mendapatkan nama kecamatan terkait, sehingga memberikan gambaran lengkap tentang profil risiko kecamatan yang telah dibuat
    static async createDistrictRisk(data) {
        const { districtId, averageScore, highRiskCount, modelVersion } = data;

        const newRisk = await DistrictRiskModel.create({
            kecamatan_id: districtId,
            rata_rata_skor: averageScore,
            jumlah_risiko_tinggi: highRiskCount,
            versi_model_ai: modelVersion,
        });

        const district = await DistrictModel.findById(districtId);
        return mapDistrictRiskDBToModel({ ...newRisk, nama_kecamatan: district?.nama_kecamatan });
    }

    static async getDistrictRanking() {
        return await DistrictRiskModel.getRanking();
    }

    static async getPendingReviews() {
        return await DistrictRiskModel.getPendingReviews();
    }

    static async validateDistrictRiskExists(id) {
        const risk = await DistrictRiskModel.findById(id);
        if (!risk) {
            throw new InvariantError('Data risiko kecamatan tidak ditemukan', 404);
        }
        return risk;
    }
}

module.exports = DistrictRiskService;