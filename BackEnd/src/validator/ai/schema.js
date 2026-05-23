// src/validator/ai/index.js

const Joi = require('joi');

const predictRiskSchema = Joi.object({
    school_id: Joi.number().integer().positive().required().messages({
        'any.required': 'ID sekolah wajib diisi',
        'number.base': 'ID sekolah harus berupa angka'
    })
});

const batchPredictSchema = Joi.object({
    school_ids: Joi.array().items(Joi.number().integer().positive()).min(1).max(100).optional(),
    model_version: Joi.string().required().messages({
        'any.required': 'Versi model AI wajib diisi'
    })
});

const getInsightsSchema = Joi.object({
    district_id: Joi.number().integer().positive().optional(),
    limit: Joi.number().integer().min(1).max(20).default(5)
});

const trainModelSchema = Joi.object({
    force_retrain: Joi.boolean().default(false),
    test_split: Joi.number().min(0.1).max(0.3).default(0.2)
});

module.exports = {
    predictRiskSchema,
    batchPredictSchema,
    getInsightsSchema,
    trainModelSchema
};