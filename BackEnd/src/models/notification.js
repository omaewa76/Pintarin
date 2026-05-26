// src/models/Notification.js

const BaseModel = require('./base');
const { query } = require('../../config/db.config');

// Model untuk menyimpan notifikasi yang dikirim ke pengguna
class NotificationModel extends BaseModel {
    static tableName = 'notifikasi';
    static primaryKey = 'id';

    static async findByUserId(userId, options = {}) {
        const { onlyUnread = false, page = 1, limit = 20 } = options;
        const offset = (page - 1) * limit;
        const conditions = [`pengguna_id = $1`];
        const params = [userId];

        let paramIndex = 2;
        if (onlyUnread) {
            conditions.push(`sudah_dibaca = false`);
        }

        const whereClause = `WHERE ${conditions.join(' AND ')}`;

        const countResult = await query(
            `SELECT COUNT(*) as total FROM ${this.tableName} ${whereClause}`,
            params
        );
        const total = parseInt(countResult.rows[0].total);

        params.push(limit, offset);

        const result = await query(
            `SELECT n.*, u.nama_lengkap as nama_pengguna
             FROM ${this.tableName} n
             LEFT JOIN pengguna u ON n.pengguna_id = u.id
             ${whereClause}
             ORDER BY n.created_at DESC
             LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
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

    static async markAsRead(id, userId) {
        const result = await query(
            `UPDATE ${this.tableName} SET sudah_dibaca = true WHERE id = $1 AND pengguna_id = $2 RETURNING *`,
            [id, userId]
        );
        return result.rows[0] || null;
    }

    static async markAllAsRead(userId) {
        const result = await query(
            `UPDATE ${this.tableName} SET sudah_dibaca = true WHERE pengguna_id = $1 AND sudah_dibaca = false RETURNING id`,
            [userId]
        );
        return result.rows.length;
    }

    static async getUnreadCount(userId) {
        const result = await query(
            `SELECT COUNT(*) as count FROM ${this.tableName} WHERE pengguna_id = $1 AND sudah_dibaca = false`,
            [userId]
        );
        return parseInt(result.rows[0].count);
    }
}

module.exports = NotificationModel;