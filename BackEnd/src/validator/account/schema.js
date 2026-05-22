const Joi = require('joi');

const accountQuerySchema = Joi.object({
    role: Joi.string().valid('dinas', 'sekolah', 'csr').optional(),
    status: Joi.string().valid('active', 'suspended').optional(),
    search: Joi.string().max(100).optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
});

const accountIdSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'any.required': 'ID user wajib diisi',
        'number.base': 'ID user harus berupa angka'
    })
});

const createAccountSchema = Joi.object({
    full_name: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('dinas', 'sekolah', 'csr').required(),
    school_id: Joi.when('role', {
        is: 'sekolah',
        then: Joi.number().integer().positive().required(),
        otherwise: Joi.optional()
    }),
    csr_company_id: Joi.when('role', {
        is: 'csr',
        then: Joi.number().integer().positive().required(),
        otherwise: Joi.optional()
    })
});

const updateAccountSchema = Joi.object({
    full_name: Joi.string().max(100).optional(),
    email: Joi.string().email().optional(),
    role: Joi.string().valid('dinas', 'sekolah', 'csr').optional(),
    school_id: Joi.number().integer().positive().optional(),
    csr_company_id: Joi.number().integer().positive().optional()
});

const suspendAccountSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    reason: Joi.string().optional()
});

const activateAccountSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

module.exports = {
    accountQuerySchema,
    accountIdSchema,
    createAccountSchema,
    updateAccountSchema,
    suspendAccountSchema,
    activateAccountSchema
};