// src/validator/auth/index.js

const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email harus valid',
        'any.required': 'Email wajib diisi',
        'string.empty': 'Email tidak boleh kosong'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password minimal 6 karakter',
        'any.required': 'Password wajib diisi',
        'string.empty': 'Password tidak boleh kosong'
    })
});

const refreshTokenSchema = Joi.object({
    refresh_token: Joi.string().required().messages({
        'any.required': 'Refresh token wajib diisi',
        'string.empty': 'Refresh token tidak boleh kosong'
    })
});

const changePasswordSchema = Joi.object({
    old_password: Joi.string().min(6).required().messages({
        'string.min': 'Password lama minimal 6 karakter',
        'any.required': 'Password lama wajib diisi'
    }),
    new_password: Joi.string().min(6).required().messages({
        'string.min': 'Password baru minimal 6 karakter',
        'any.required': 'Password baru wajib diisi'
    }),
    confirm_password: Joi.string().valid(Joi.ref('new_password')).required().messages({
        'any.only': 'Konfirmasi password tidak cocok',
        'any.required': 'Konfirmasi password wajib diisi'
    })
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email harus valid',
        'any.required': 'Email wajib diisi'
    })
});

const resetPasswordSchema = Joi.object({
    token: Joi.string().required().messages({
        'any.required': 'Token wajib diisi'
    }),
    new_password: Joi.string().min(6).required().messages({
        'string.min': 'Password baru minimal 6 karakter',
        'any.required': 'Password baru wajib diisi'
    }),
    confirm_password: Joi.string().valid(Joi.ref('new_password')).required().messages({
        'any.only': 'Konfirmasi password tidak cocok',
        'any.required': 'Konfirmasi password wajib diisi'
    })
});

module.exports = {
    loginSchema,
    refreshTokenSchema,
    changePasswordSchema,
    forgotPasswordSchema,
    resetPasswordSchema
};