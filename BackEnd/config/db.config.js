// config/db.config.js

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'pintarin',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'admin',
    max: process.env.PGMAXPOLL || 20,
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