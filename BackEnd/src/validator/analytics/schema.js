// src/validator/analytics/schema.js

const Joi = require('joi');

const overviewSchema = Joi.object({
    date_from: Joi.date().optional(),
    date_to: Joi.date().min(Joi.ref('date_from')).optional()
});

const riskTrendSchema = Joi.object({
    months: Joi.number().integer().min(1).max(12).default(6)
});

const districtRankingSchema = Joi.object({
    limit: Joi.number().integer().min(1).max(50).default(10),
    sort: Joi.string().valid('asc', 'desc').default('desc')
});

const assistanceSummarySchema = Joi.object({
    year: Joi.number().integer().min(2020).max(new Date().getFullYear()).optional(),
    group_by: Joi.string().valid('month', 'type').default('month')
});

const schoolComparisonSchema = Joi.object({
    school_ids: Joi.array().items(Joi.number().integer().positive()).min(1).max(10).required()
});

module.exports = {
    overviewSchema,
    riskTrendSchema,
    districtRankingSchema,
    assistanceSummarySchema,
    schoolComparisonSchema
};