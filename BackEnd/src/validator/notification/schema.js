const Joi = require('joi');

const notificationQuerySchema = Joi.object({
    only_unread: Joi.boolean().default(false),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
});

const notificationIdSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'any.required': 'ID notifikasi wajib diisi',
        'number.base': 'ID notifikasi harus berupa angka'
    })
});

const createNotificationSchema = Joi.object({
    user_id: Joi.number().integer().positive().required(),
    title: Joi.string().max(200).required(),
    message: Joi.string().required(),
    type: Joi.string().valid('info', 'warning', 'success', 'error').default('info'),
    link: Joi.string().max(255).optional()
});

const broadcastNotificationSchema = Joi.object({
    role: Joi.string().valid('dinas', 'sekolah', 'csr').required(),
    title: Joi.string().max(200).required(),
    message: Joi.string().required(),
    type: Joi.string().valid('info', 'warning', 'success', 'error').default('info'),
    link: Joi.string().max(255).optional()
});

module.exports = {
    notificationQuerySchema,
    notificationIdSchema,
    createNotificationSchema,
    broadcastNotificationSchema
};