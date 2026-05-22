const { responseError } = require('../utils/errorHandler');

const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return responseError(res, 'Tidak terautentikasi', 401);
        }

        if (!allowedRoles.includes(req.user.role)) {
            return responseError(res, 'Akses ditolak', 403);
        }

        next();
    };
};

const requireDinas = requireRole('dinas');
const requireSchool = requireRole('sekolah');
const requireCSR = requireRole('csr');

module.exports = { requireRole, requireDinas, requireSchool, requireCSR };