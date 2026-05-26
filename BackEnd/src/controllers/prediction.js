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

  const validActions = ['approve', 'override', 'flag_for_review'];
  if (!validActions.includes(action)) {
    throw new InvariantError(`Action tidak valid. Pilihan: ${validActions.join(', ')}`);
  }

  if (action === 'override' && !corrected_label) {
    throw new InvariantError('corrected_label wajib diisi saat action = override');
  }

  await PredictionService.validatePredictionExists(predictionId);

  let result;
  if (action === 'override') {
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
    await PredictionService.updatePredictionWithApprove(predictionId, reason || 'Disetujui oleh petugas');
    result = {
      prediction_id: predictionId,
      action,
      final_label: null,
      validated_by: officerId,
    };
  } else {
    await PredictionService.updatePredictionWithFlag(predictionId, reason || 'Perlu review lebih lanjut');
    result = {
      prediction_id: predictionId,
      action,
      validated_by: officerId,
    };
  }

  await PredictionService.createValidationRecord({
    predictionId,
    officerId,
    action,
    reason,
    correctedLabel: corrected_label || null,
  });

  return responseSuccess(res, {
    ...result,
    validated_at: new Date().toISOString(),
  }, `Prediksi berhasil di-${action}`);
});

const getValidationHistory = asyncHandler(async (req, res) => {
  const predictionId = parseInt(req.params.id);
  await PredictionService.validatePredictionExists(predictionId);
  const history = await PredictionService.getValidationHistory(predictionId);
  return responseSuccess(res, history, 'History validasi berhasil diambil');
});

const getValidationStats = asyncHandler(async (req, res) => {
  const stats = await PredictionService.getValidationStats();
  return responseSuccess(res, stats, 'Statistik validasi berhasil diambil');
});

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