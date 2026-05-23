// src/validator/submission/index.js

const Joi = require('joi');

const submissionQuerySchema = Joi.object({
    status: Joi.string().valid('Pending', 'Approved', 'Rejected').optional(),
    school_id: Joi.number().integer().positive().optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
});

const submissionIdSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'any.required': 'ID submission wajib diisi',
        'number.base': 'ID submission harus berupa angka'
    })
});

const createSubmissionSchema = Joi.object({
    update_type: Joi.string().max(100).required().messages({
        'any.required': 'Jenis perubahan wajib diisi',
        'string.max': 'Jenis perubahan maksimal 100 karakter'
    }),
    data_after: Joi.object().required().messages({
        'any.required': 'Data perubahan wajib diisi'
    }),
    data_before: Joi.object().optional()
});

const approveSubmissionSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

const rejectSubmissionSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    rejection_reason: Joi.string().min(5).required().messages({
        'any.required': 'Alasan penolakan wajib diisi',
        'string.min': 'Alasan penolakan minimal 5 karakter'
    })
});

module.exports = {
    submissionQuerySchema,
    submissionIdSchema,
    createSubmissionSchema,
    approveSubmissionSchema,
    rejectSubmissionSchema
};