// src/validator/prediction/schema.js

const Joi = require('joi');

const predictionValidationSchema = Joi.object({
    action: Joi.string().valid('approve', 'override', 'flag_for_review').required().messages({
        'any.required': 'action wajib diisi',
        'any.only': 'action harus salah satu dari: approve, override, flag_for_review'
    }),
    reason: Joi.string().max(500).optional().allow(null, ''),
    corrected_label: Joi.when('action', {
        is: 'override',
        then: Joi.string().valid('Rendah', 'Sedang', 'Tinggi').required().messages({
            'any.required': 'corrected_label wajib diisi untuk action override',
            'any.only': 'corrected_label harus: Rendah, Sedang, atau Tinggi'
        }),
        otherwise: Joi.string().valid('Rendah', 'Sedang', 'Tinggi').optional().allow(null)
    })
});

const predictionIdSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'any.required': 'ID prediksi wajib diisi',
        'number.base': 'ID prediksi harus berupa angka',
        'number.positive': 'ID prediksi harus lebih dari 0'
    })
});

const predictionQuerySchema = Joi.object({
    limit: Joi.number().integer().min(1).max(100).default(20),
    page: Joi.number().integer().min(1).default(1)
});

module.exports = {
    predictionValidationSchema,
    predictionIdSchema,
    predictionQuerySchema
};