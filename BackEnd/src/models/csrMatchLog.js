// src/models/CSRMatchLogModel.js

const BaseModel = require('./base');
const { query } = require('../../config/db.config');

// Model untuk menyimpan log hasil pencocokan CSR berdasarkan fokus area dan rentang anggaran
class CSRMatchLogModel extends BaseModel {
    static tableName = 'csr_match_logs';
    static primaryKey = 'id';

    // Fungsi untuk membuat log pencocokan CSR baru dengan input data yang diberikan, serta mengembalikan data yang baru dibuat beserta informasi tambahan jika diperlukan
    static async create(data) {
        const { focusArea, budgetRange, userId, results } = data;
        const result = await query(`
            INSERT INTO ${this.tableName}
                (focus_area, budget_range, user_id, results_json)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [focusArea, budgetRange, userId || null, JSON.stringify(results)]);
        return result.rows[0];
    }

    // Fungsi untuk mengambil riwayat pencocokan CSR berdasarkan ID pengguna dengan batasan jumlah hasil yang dikembalikan, serta mengembalikan data dalam bentuk array objek yang berisi informasi fokus area, rentang anggaran, hasil pencocokan dalam format JSON, dan tanggal pencocokan
    static async getHistoryByUserId(userId, limit = 10) {
        const result = await query(`
            SELECT 
                id,
                focus_area,
                budget_range,
                results_json,
                created_at
            FROM ${this.tableName}
            WHERE user_id = $1
            ORDER BY created_at DESC
            LIMIT $2
        `, [userId, limit]);
        return result.rows;
    }

    // Fungsi untuk mengambil statistik pencocokan CSR berdasarkan fokus area, dengan mengelompokkan hasil berdasarkan fokus area dan tanggal pencocokan, serta mengembalikan data dalam bentuk array objek yang berisi informasi fokus area, total pencocokan, dan tanggal pencocokan
    static async getStatisticsByFocusArea() {
        const result = await query(`
            SELECT 
                focus_area,
                COUNT(*) as total_matches,
                DATE(created_at) as date
            FROM ${this.tableName}
            GROUP BY focus_area, DATE(created_at)
            ORDER BY DATE(created_at) DESC
            LIMIT 30
        `);
        return result.rows;
    }
}

module.exports = CSRMatchLogModel;