// config/db.config.js

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.PGHOST || process.env.DB_HOST,
    port: process.env.PGPORT || process.env.DB_PORT || 5432,
    database: process.env.PGDATABASE || process.env.DB_NAME,
    user: process.env.PGUSER || process.env.DB_USER,
    password: process.env.PGPASSWORD || process.env.DB_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Berhasil terhubung ke database PostgreSQL');
    } catch (error) {
        console.error('Gagal koneksi database:', error.message);
        process.exit(1);
    }
};

const query = (text, params) => pool.query(text, params);

module.exports = {
    pool,
    connectDB,
    query
};