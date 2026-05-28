// src/services/postgres/prediction.js

const { PredictionModel, PredictionValidationModel, DistrictModel } = require('../../models');
const { mapDistrictRiskWithConfidenceDBToModel, mapPredictionValidationDBToModel } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');

//  Service untuk manajemen prediksi AI
class PredictionService {
    static async getPendingReviews() {
        const pendingReviews = await PredictionModel.getPendingReviews();
        return pendingReviews.map(mapDistrictRiskWithConfidenceDBToModel);
    }

    static async getPredictionById(id) {
        const prediction = await PredictionModel.findByIdWithDetails(id);
        if (!prediction) return null;
        return mapDistrictRiskWithConfidenceDBToModel(prediction);
    }

    // Fungsi untuk membuat record validasi prediksi, dengan menyimpan data validasi ke database dan kemudian mengambil detail record validasi tersebut berdasarkan ID yang baru dibuat, dengan join ke tabel pengguna untuk mendapatkan nama petugas yang melakukan validasi, sehingga memberikan gambaran lengkap tentang hasil validasi yang telah dilakukan terhadap prediksi tersebut
    static async createValidationRecord(data) {
        const { predictionId, officerId, action, reason, correctedLabel } = data;
        const record = await PredictionValidationModel.create({
            predictionId,
            officerId,
            action,
            reason,
            correctedLabel,
        });
        return mapPredictionValidationDBToModel(record);
    }

    // Fungsi untuk memperbarui prediksi dengan hasil override dari petugas, dengan menyimpan perubahan data ke database dan kemudian mengambil detail prediksi tersebut berdasarkan ID setelah pembaruan dilakukan, dengan join ke tabel kecamatan untuk mendapatkan nama kecamatan terkait, serta menyertakan informasi risiko terkini dan history risiko untuk memberikan gambaran lengkap tentang profil prediksi tersebut setelah dilakukan override oleh petugas
    static async updatePredictionWithOverride(id, data) {
        const { finalLabel, validationNote } = data;
        const prediction = await PredictionModel.overridePrediction(id, finalLabel, validationNote);
        if (!prediction) return null;
        return mapDistrictRiskWithConfidenceDBToModel(prediction);
    }

    static async updatePredictionWithApprove(id, validationNote) {
        const prediction = await PredictionModel.approvePrediction(id, validationNote);
        if (!prediction) return null;
        return mapDistrictRiskWithConfidenceDBToModel(prediction);
    }

    static async updatePredictionWithFlag(id, validationNote) {
        const prediction = await PredictionModel.flagForReview(id, validationNote);
        if (!prediction) return null;
        return mapDistrictRiskWithConfidenceDBToModel(prediction);
    }

    static async getValidationHistory(predictionId) {
        const history = await PredictionValidationModel.getHistoryByPredictionId(predictionId);
        return history.map(mapPredictionValidationDBToModel);
    }

    static async getValidationStats() {
        const stats = await PredictionValidationModel.getStatistics();
        const byOfficer = await PredictionValidationModel.getStatisticsByOfficer();
        return {
            summary: stats,
            byOfficer,
        };
    }

    static async getLatestPredictions(limit = 20) {
        const predictions = await PredictionModel.getLatestPredictions(limit);
        return predictions.map(mapDistrictRiskWithConfidenceDBToModel);
    }

    static async getDistrictRankingForCSR() {
        const districts = await DistrictModel.findAllWithRisk({ limit: 100 });
        return districts.data;
    }

    static async validatePredictionExists(id) {
        const prediction = await this.getPredictionById(id);
        if (!prediction) {
            throw new InvariantError('Prediksi tidak ditemukan', 404);
        }
        return prediction;
    }
}

module.exports = PredictionService;