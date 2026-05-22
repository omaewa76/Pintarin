const Joi = require('joi');

const schoolQuerySchema = Joi.object({
    district: Joi.number().integer().positive().optional(),
    level: Joi.string().valid('SD', 'SMP', 'SMA', 'SMK').optional(),
    status: Joi.string().valid('Aktif', 'Tidak Aktif').optional(),
    risk_category: Joi.string().valid('Tinggi', 'Sedang', 'Rendah').optional(),
    search: Joi.string().max(100).optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
});

const schoolIdSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'any.required': 'ID sekolah wajib diisi',
        'number.base': 'ID sekolah harus berupa angka',
        'number.positive': 'ID sekolah harus lebih dari 0'
    })
});

const verifySchoolSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'any.required': 'ID sekolah wajib diisi',
        'number.base': 'ID sekolah harus berupa angka'
    })
});

const riskHistorySchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    limit: Joi.number().integer().min(1).max(100).default(30)
});

const createSchoolSchema = Joi.object({
    name: Joi.string().max(150).required(),
    npsn: Joi.string().length(20).required(),
    district_id: Joi.number().integer().positive().required(),
    level: Joi.string().valid('SD', 'SMP', 'SMA', 'SMK').required(),
    accreditation: Joi.string().valid('A', 'B', 'C', 'Belum Terakreditasi').required(),
    student_count: Joi.number().integer().min(0).default(0),
    vulnerable_student_count: Joi.number().integer().min(0).default(0),
    pip_recipient_count: Joi.number().integer().min(0).default(0),
    teacher_count: Joi.number().integer().min(0).default(0),
    classroom_count: Joi.number().integer().min(0).default(0),
    building_condition: Joi.string().valid('Baik', 'Rusak Ringan', 'Rusak Sedang', 'Rusak Berat').required(),
    latitude: Joi.number().min(-90).max(90).optional(),
    longitude: Joi.number().min(-180).max(180).optional(),
    address: Joi.string().optional(),
    phone: Joi.string().max(20).optional(),
    email: Joi.string().email().optional(),
    principal_name: Joi.string().max(100).optional(),
    status: Joi.string().valid('Aktif', 'Tidak Aktif').default('Aktif')
});

const updateSchoolSchema = Joi.object({
    name: Joi.string().max(150).optional(),
    npsn: Joi.string().length(20).optional(),
    district_id: Joi.number().integer().positive().optional(),
    level: Joi.string().valid('SD', 'SMP', 'SMA', 'SMK').optional(),
    accreditation: Joi.string().valid('A', 'B', 'C', 'Belum Terakreditasi').optional(),
    student_count: Joi.number().integer().min(0).optional(),
    vulnerable_student_count: Joi.number().integer().min(0).optional(),
    pip_recipient_count: Joi.number().integer().min(0).optional(),
    teacher_count: Joi.number().integer().min(0).optional(),
    classroom_count: Joi.number().integer().min(0).optional(),
    building_condition: Joi.string().valid('Baik', 'Rusak Ringan', 'Rusak Sedang', 'Rusak Berat').optional(),
    latitude: Joi.number().min(-90).max(90).optional(),
    longitude: Joi.number().min(-180).max(180).optional(),
    address: Joi.string().optional(),
    phone: Joi.string().max(20).optional(),
    email: Joi.string().email().optional(),
    principal_name: Joi.string().max(100).optional(),
    status: Joi.string().valid('Aktif', 'Tidak Aktif').optional()
});

module.exports = {
    schoolQuerySchema,
    schoolIdSchema,
    verifySchoolSchema,
    riskHistorySchema,
    createSchoolSchema,
    updateSchoolSchema
};