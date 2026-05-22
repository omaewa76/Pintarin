const errorHandler = (err, req, res, next) => {
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

module.exports = {
    errorHandler,
    responseSuccess,
    responseError
};