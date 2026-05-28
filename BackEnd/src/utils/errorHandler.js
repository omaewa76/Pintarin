// src/utils/errorHandler.js

// Fungsi untuk menangani error yang tidak tertangani di seluruh aplikasi, dengan mengembalikan response error yang konsisten dan informatif kepada klien, serta mencatat error tersebut untuk keperluan debugging dan pemantauan
const errorHandler = (err, req, res) => {
    console.error('Unhandled error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Terjadi kesalahan internal server';

    res.status(statusCode).json({
        success: false,
        message,
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

// Fungsi untuk mengirim response sukses dengan format yang konsisten, termasuk status code, pesan, data, dan timestamp untuk memberikan informasi yang jelas kepada klien tentang hasil dari permintaan yang dilakukan
const responseSuccess = (res, data, message = 'Berhasil', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    });
};

const responseError = (res, message = 'Terjadi kesalahan', statusCode = 500, errors = null) => {
    const response = {
        success: false,
        message,
        timestamp: new Date().toISOString()
    };

    if (errors) response.errors = errors;

    return res.status(statusCode).json(response);
};

const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = {
    errorHandler,
    responseSuccess,
    responseError,
    asyncHandler
};