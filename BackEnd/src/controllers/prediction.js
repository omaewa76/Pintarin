// src/controllers/prediction.js

const { responseSuccess, asyncHandler } = require('../utils/errorHandler');
const { Prediction } = require('../services/postgres');
const InvariantError = require('../exceptions/InvariantError');

const getPendingReview = asyncHandler(async (req, res) => {
  const result = await Prediction.getPendingReviews();
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

  await Prediction.validatePredictionExists(predictionId);

  let result;
  if (action === 'override') {
    await Prediction.updatePredictionWithOverride(predictionId, {
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
    await Prediction.updatePredictionWithApprove(predictionId, reason || 'Disetujui oleh petugas');
    result = {
      prediction_id: predictionId,
      action,
      final_label: null,
      validated_by: officerId,
    };
  } else {
    await Prediction.updatePredictionWithFlag(predictionId, reason || 'Perlu review lebih lanjut');
    result = {
      prediction_id: predictionId,
      action,
      validated_by: officerId,
    };
  }

  await Prediction.createValidationRecord({
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
  await Prediction.validatePredictionExists(predictionId);
  const history = await Prediction.getValidationHistory(predictionId);
  return responseSuccess(res, history, 'History validasi berhasil diambil');
});

const getValidationStats = asyncHandler(async (req, res) => {
  const stats = await Prediction.getValidationStats();
  return responseSuccess(res, stats, 'Statistik validasi berhasil diambil');
});

const getLatestPredictions = asyncHandler(async (req, res) => {
  const { limit = 20 } = req.query;
  const predictions = await Prediction.getLatestPredictions(parseInt(limit));
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