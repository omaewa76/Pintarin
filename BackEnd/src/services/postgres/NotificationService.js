// src/services/postgres/NotificationService.js

const { query } = require('../../../config/db.config');
const { mapNotificationDBToModel } = require('../../utils');

class NotificationService {
    // Mendapatkan notifikasi untuk user tertentu
    static async getUserNotifications(userId, { onlyUnread = false, page = 1, limit = 20 } = {}) {
        const conditions = [`pengguna_id = $1`];
        const params = [userId];
        let paramIndex = 2;

        if (onlyUnread) {
            conditions.push(`sudah_dibaca = false`);
        }

        const whereClause = `WHERE ${conditions.join(' AND ')}`;

        const countResult = await query(
            `SELECT COUNT(*) as total FROM notifikasi ${whereClause}`,
            params
        );
        const total = parseInt(countResult.rows[0].total);

        const offset = (page - 1) * limit;
        params.push(limit, offset);

        const result = await query(
            `SELECT n.*, u.nama_lengkap as nama_pengguna
       FROM notifikasi n
       LEFT JOIN pengguna u ON n.pengguna_id = u.id
       ${whereClause}
       ORDER BY n.created_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
            params
        );

        const data = result.rows.map(mapNotificationDBToModel);

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },
            unreadCount: await this.getUnreadCount(userId)
        };
    }

    // Mendapatkan jumlah notifikasi belum dibaca
    static async getUnreadCount(userId) {
        const result = await query(
            `SELECT COUNT(*) as count FROM notifikasi 
       WHERE pengguna_id = $1 AND sudah_dibaca = false`,
            [userId]
        );

        return parseInt(result.rows[0].count);
    }

    // Membuat notifikasi baru
    static async createNotification(data) {
        const { userId, title, message, type, link } = data;

        const result = await query(
            `INSERT INTO notifikasi 
       (pengguna_id, judul_notifikasi, isi_pesan, tipe_notifikasi, tautan_terkait)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
            [userId, title, message, type, link]
        );

        const userResult = await query(
            `SELECT nama_lengkap FROM pengguna WHERE id = $1`,
            [userId]
        );

        const row = { ...result.rows[0], nama_pengguna: userResult.rows[0]?.nama_lengkap };

        return mapNotificationDBToModel(row);
    }

    // Menandai notifikasi sebagai dibaca
    static async markAsRead(notificationId, userId) {
        const result = await query(
            `UPDATE notifikasi 
       SET sudah_dibaca = true
       WHERE id = $1 AND pengguna_id = $2
       RETURNING *`,
            [notificationId, userId]
        );

        if (result.rows.length === 0) return null;

        const userResult = await query(
            `SELECT nama_lengkap FROM pengguna WHERE id = $1`,
            [userId]
        );

        const row = { ...result.rows[0], nama_pengguna: userResult.rows[0]?.nama_lengkap };

        return mapNotificationDBToModel(row);
    }

    // Menandai semua notifikasi user sebagai dibaca
    static async markAllAsRead(userId) {
        const result = await query(
            `UPDATE notifikasi 
       SET sudah_dibaca = true
       WHERE pengguna_id = $1 AND sudah_dibaca = false
       RETURNING id`,
            [userId]
        );

        return result.rows.length;
    }

    // Menghapus notifikasi (opsional)
    static async deleteNotification(notificationId, userId) {
        const result = await query(
            `DELETE FROM notifikasi 
       WHERE id = $1 AND pengguna_id = $2
       RETURNING id`,
            [notificationId, userId]
        );

        return result.rows.length > 0;
    }

    // Membuat notifikasi massal untuk semua pengguna dengan role tertentu
    static async broadcastNotification(role, title, message, type, link = null) {
        // Ambil semua user dengan role tertentu
        const usersResult = await query(
            `SELECT id FROM pengguna WHERE peran = $1 AND akun_aktif = true`,
            [role]
        );

        const notifications = [];
        for (const user of usersResult.rows) {
            const notif = await this.createNotification({
                userId: user.id,
                title,
                message,
                type,
                link
            });
            notifications.push(notif);
        }

        return notifications;
    }
}

module.exports = NotificationService;