// src/controllers/prediction.js

const { responseSuccess, asyncHandler } = require('../utils/errorHandler');
const { PredictionService } = require('../services/postgres');
const InvariantError = require('../exceptions/InvariantError');

// Controller untuk manajemen prediksi AI, termasuk pengambilan prediksi yang perlu direview, validasi prediksi oleh petugas, dan pengambilan history validasi serta statistik validasi
const getPendingReview = asyncHandler(async (req, res) => {
  const result = await PredictionService.getPendingReviews();
  return responseSuccess(res, {
    count: result.length,
    data: result,
  }, 'Data prediksi yang perlu review berhasil diambil');
});

const validatePrediction = asyncHandler(async (req, res) => {
  const predictionId = parseInt(req.params.id);
  const officerId = req.user.id;
  const { action, reason, corrected_label } = req.body;

  // Validasi data input untuk validasi prediksi, termasuk memastikan action yang dipilih valid dan jika action = override maka corrected_label wajib diisi
  const validActions = ['approve', 'override', 'flag_for_review'];
  if (!validActions.includes(action)) {
    throw new InvariantError(`Action tidak valid. Pilihan: ${validActions.join(', ')}`);
  }

  if (action === 'override' && !corrected_label) {
    throw new InvariantError('corrected_label wajib diisi saat action = override');
  }

  await PredictionService.validatePredictionExists(predictionId);

  // Lakukan update pada prediksi berdasarkan action yang dipilih, dan simpan record validasi untuk audit trail
  let result;
  if (action === 'override') {
    // Update prediksi dengan label yang dikoreksi oleh petugas, simpan catatan validasi jika ada, dan kembalikan response dengan data hasil validasi
    await PredictionService.updatePredictionWithOverride(predictionId, {
      finalLabel: corrected_label,
      validationNote: reason || `Override dari AI ke ${corrected_label}`,
    });
    result = {
      prediction_id: predictionId,
      action,
      final_label: corrected_label,
      validated_by: officerId,
    };
  } else if (action === 'approve') {
    // Update prediksi dengan status approved dan simpan catatan validasi jika ada, kemudian kembalikan response dengan data hasil validasi
    await PredictionService.updatePredictionWithApprove(predictionId, reason || 'Disetujui oleh petugas');
    result = {
      prediction_id: predictionId,
      action,
      final_label: null,
      validated_by: officerId,
    };
  } else {
    // Update prediksi dengan status flag_for_review dan simpan catatan validasi jika ada, kemudian kembalikan response dengan data hasil validasi
    await PredictionService.updatePredictionWithFlag(predictionId, reason || 'Perlu review lebih lanjut');
    result = {
      prediction_id: predictionId,
      action,
      validated_by: officerId,
    };
  }

  // Simpan record validasi ke database untuk audit trail, termasuk informasi prediksi yang divalidasi, petugas yang melakukan validasi, action yang dipilih, alasan validasi, dan label yang dikoreksi jika ada
  await PredictionService.createValidationRecord({
    predictionId,
    officerId,
    action,
    reason,
    correctedLabel: corrected_label || null,
  });

  // Kembalikan response dengan data hasil validasi dan pesan sukses
  return responseSuccess(res, {
    ...result,
    validated_at: new Date().toISOString(),
  }, `Prediksi berhasil di-${action}`);
});

// Fungsi untuk mengambil history validasi dari suatu prediksi, hanya bisa diakses oleh petugas yang melakukan validasi atau admin
const getValidationHistory = asyncHandler(async (req, res) => {
  const predictionId = parseInt(req.params.id);
  await PredictionService.validatePredictionExists(predictionId);
  const history = await PredictionService.getValidationHistory(predictionId);
  return responseSuccess(res, history, 'History validasi berhasil diambil');
});

// Fungsi untuk mengambil statistik validasi dari semua prediksi, hanya bisa diakses oleh admin
const getValidationStats = asyncHandler(async (req, res) => {
  const stats = await PredictionService.getValidationStats();
  return responseSuccess(res, stats, 'Statistik validasi berhasil diambil');
});

// Fungsi untuk mengambil prediksi terbaru yang sudah divalidasi, dengan opsi limit jumlah data yang diambil
const getLatestPredictions = asyncHandler(async (req, res) => {
  const { limit = 20 } = req.query;
  const predictions = await PredictionService.getLatestPredictions(parseInt(limit));
  return responseSuccess(res, {
    count: predictions.length,
    data: predictions,
  }, 'Data prediksi terbaru berhasil diambil');
});

module.exports = {
  getPendingReview,
  validatePrediction,
  getValidationHistory,
  getValidationStats,
  getLatestPredictions,
};