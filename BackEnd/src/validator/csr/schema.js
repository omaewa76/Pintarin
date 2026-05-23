// src/validator/csr/index.js

const Joi = require('joi');

const companyQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    search: Joi.string().max(100).optional(),
    verified: Joi.boolean().optional()
});

const companyIdSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

const createCompanySchema = Joi.object({
    name: Joi.string().max(150).required(),
    industry: Joi.string().max(100).optional(),
    contact_person: Joi.string().max(100).optional(),
    contact_email: Joi.string().email().optional(),
    contact_phone: Joi.string().max(20).optional(),
    address: Joi.string().optional()
});

const updateCompanySchema = Joi.object({
    name: Joi.string().max(150).optional(),
    industry: Joi.string().max(100).optional(),
    contact_person: Joi.string().max(100).optional(),
    contact_email: Joi.string().email().optional(),
    contact_phone: Joi.string().max(20).optional(),
    address: Joi.string().optional()
});

const assistanceQuerySchema = Joi.object({
    status: Joi.string().valid('Pending', 'Approved', 'Rejected', 'Completed').optional(),
    school_id: Joi.number().integer().positive().optional(),
    csr_company_id: Joi.number().integer().positive().optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
});

const assistanceIdSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

const createAssistanceSchema = Joi.object({
    school_id: Joi.number().integer().positive().required(),
    type: Joi.string().valid('Infrastruktur', 'Beasiswa', 'Perangkat Digital', 'Buku', 'Lainnya').required(),
    description: Joi.string().min(10).required(),
    amount: Joi.number().integer().min(1000).required()
});

const approveAssistanceSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

const rejectAssistanceSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    rejection_reason: Joi.string().min(5).required()
});

const completeAssistanceSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    notes: Joi.string().optional()
});

module.exports = {
    companyQuerySchema,
    companyIdSchema,
    createCompanySchema,
    updateCompanySchema,
    assistanceQuerySchema,
    assistanceIdSchema,
    createAssistanceSchema,
    approveAssistanceSchema,
    rejectAssistanceSchema,
    completeAssistanceSchema
};