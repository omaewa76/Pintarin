// src/models/Base.js

const { query } = require('../../config/db.config');

// BaseModel menyediakan metode umum untuk operasi CRUD dan query dasar
class BaseModel {
    static tableName = '';
    static primaryKey = 'id';

    // Fungsi untuk mengambil semua data dengan dukungan filter, pagination, dan pengurutan berdasarkan parameter yang diberikan
    static async findAll(options = {}) {
        const { page = 1, limit = 20, where = {}, orderBy = `${this.primaryKey} DESC` } = options;
        const offset = (page - 1) * limit;

        const whereClause = this.buildWhereClause(where);
        const params = [...whereClause.values, limit, offset];

        const countResult = await query(
            `SELECT COUNT(*) as total FROM ${this.tableName} ${whereClause.clause}`,
            whereClause.values
        );
        const total = parseInt(countResult.rows[0].total);

        // Ambil data dengan query yang dibangun berdasarkan filter, pagination, dan pengurutan yang diberikan, serta kembalikan hasil beserta informasi pagination untuk membantu klien dalam mengelola data yang diambil
        const result = await query(
            `SELECT * FROM ${this.tableName} ${whereClause.clause} ORDER BY ${orderBy} LIMIT $${whereClause.values.length + 1} OFFSET $${whereClause.values.length + 2}`,
            params
        );

        return {
            data: result.rows,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    // Fungsi untuk mengambil detail data berdasarkan ID, dengan opsi untuk menyertakan relasi atau informasi tambahan jika diperlukan
    static async findById(id) {
        const result = await query(
            `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = $1`,
            [id]
        );
        return result.rows[0] || null;
    }

    // Fungsi untuk mengambil satu data berdasarkan kondisi tertentu, dengan opsi untuk menyertakan relasi atau informasi tambahan jika diperlukan
    static async findOne(where) {
        const whereClause = this.buildWhereClause(where);
        const result = await query(
            `SELECT * FROM ${this.tableName} ${whereClause.clause} LIMIT 1`,
            whereClause.values
        );
        return result.rows[0] || null;
    }

    // Fungsi untuk membuat data baru dengan input data yang diberikan, serta mengembalikan data yang baru dibuat beserta informasi tambahan jika diperlukan
    static async create(data) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
        const columns = keys.join(', ');

        const result = await query(
            `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`,
            values
        );
        return result.rows[0];
    }

    // Fungsi untuk memperbarui data berdasarkan ID dengan input data yang diberikan, serta mengembalikan data yang telah diperbarui beserta informasi tambahan jika diperlukan
    static async updateById(id, data) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

        const result = await query(
            `UPDATE ${this.tableName} SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE ${this.primaryKey} = $${keys.length + 1} RETURNING *`,
            [...values, id]
        );
        return result.rows[0] || null;
    }

    // Fungsi untuk menghapus data berdasarkan ID, serta mengembalikan informasi apakah penghapusan berhasil atau tidak
    static async deleteById(id) {
        const result = await query(
            `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = $1 RETURNING ${this.primaryKey}`,
            [id]
        );
        return result.rows.length > 0;
    }

    // Fungsi untuk membangun klausa WHERE berdasarkan objek kondisi yang diberikan, serta mengembalikan klausa dan nilai parameter yang sesuai untuk digunakan dalam query SQL
    static buildWhereClause(where) {
        const keys = Object.keys(where);
        if (keys.length === 0) {
            return { clause: '', values: [] };
        }

        const conditions = keys.map((key, i) => `${key} = $${i + 1}`);
        const values = Object.values(where);

        return {
            clause: `WHERE ${conditions.join(' AND ')}`,
            values,
        };
    }

    static async rawQuery(sql, params = []) {
        const result = await query(sql, params);
        return result.rows;
    }

    static async beginTransaction() {
        const { pool } = require('../../config/db.config');
        const client = await pool.connect();
        await client.query('BEGIN');
        return client;
    }

    static async commitTransaction(client) {
        await client.query('COMMIT');
        client.release();
    }

    static async rollbackTransaction(client) {
        await client.query('ROLLBACK');
        client.release();
    }
}

module.exports = BaseModel;