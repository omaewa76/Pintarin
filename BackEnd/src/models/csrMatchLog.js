// src/models/CSRMatchLogModel.js

const BaseModel = require('./base');
const { query } = require('../../config/db.config');

// Model untuk menyimpan log hasil pencocokan CSR berdasarkan fokus area dan rentang anggaran
class CSRMatchLogModel extends BaseModel {
    static tableName = 'csr_match_logs';
    static primaryKey = 'id';

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