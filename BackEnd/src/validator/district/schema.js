// src/validator/district/index.js

const Joi = require('joi');

const districtQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    search: Joi.string().max(100).optional()
});

const districtIdSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'any.required': 'ID kecamatan wajib diisi',
        'number.base': 'ID kecamatan harus berupa angka'
    })
});

const createDistrictSchema = Joi.object({
    name: Joi.string().max(100).required(),
    area_km2: Joi.number().positive().optional(),
    population: Joi.number().integer().min(0).optional(),
    geojson: Joi.string().optional()
});

const updateDistrictSchema = Joi.object({
    name: Joi.string().max(100).optional(),
    area_km2: Joi.number().positive().optional(),
    population: Joi.number().integer().min(0).optional(),
    geojson: Joi.string().optional()
});

module.exports = {
    districtQuerySchema,
    districtIdSchema,
    createDistrictSchema,
    updateDistrictSchema
};