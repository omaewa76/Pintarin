// src/middleware/roleGuard.js

const { responseError } = require('../utils/errorHandler');

const roleGuard = (allowedRoles) => {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return (req, res, next) => {
    if (!req.user) {
      return responseError(res, 'Tidak terautentikasi. Silakan login terlebih dahulu.', 401);
    }

    if (!roles.includes(req.user.role)) {
      const roleList = roles.join(' atau ');
      return responseError(
        res,
        `Akses ditolak. Fitur ini hanya untuk role: ${roleList}`,
        403
      );
    }

    next();
  };
};

const guardDinas = roleGuard('dinas');
const guardCSR = roleGuard('csr');
const guardSekolah = roleGuard('sekolah');
const guardAdmin = roleGuard('admin');
const guardDinasOrAdmin = roleGuard(['dinas', 'admin']);

module.exports = {
  roleGuard,
  guardDinas,
  guardCSR,
  guardSekolah,
  guardAdmin,
  guardDinasOrAdmin,
};