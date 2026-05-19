// config/db.config.js

// Konfigurasi database untuk koneksi ke PostgreSQL
module.exports = {
    USER: process.env.PGUSER,
    HOST: process.env.PGHOST,
    DB: process.env.PGDATABASE,
    PASSWD: process.env.PGPASSWORD,
    PORT: process.env.PGPORT,
    POOL: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};