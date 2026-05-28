// src/services/postgres/notification.js

const { NotificationModel, UserModel } = require('../../models');
const { mapNotificationDBToModel } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');

// Service untuk manajemen notifikasi
class NotificationService {
    static async getUserNotifications(userId, { onlyUnread = false, page = 1, limit = 20 } = {}) {
        const result = await NotificationModel.findByUserId(userId, { onlyUnread, page, limit });
        return {
            data: result.data.map(mapNotificationDBToModel),
            pagination: result.pagination,
            unreadCount: await NotificationModel.getUnreadCount(userId),
        };
    }

    static async getUnreadCount(userId) {
        return await NotificationModel.getUnreadCount(userId);
    }

    // Fungsi untuk membuat notifikasi baru, dengan menyimpan data notifikasi ke database dan kemudian mengambil detail notifikasi tersebut berdasarkan ID yang baru dibuat, dengan join ke tabel pengguna untuk mendapatkan informasi tambahan seperti nama pengguna, sehingga memberikan gambaran lengkap tentang notifikasi yang telah dibuat
    static async createNotification(data) {
        const { userId, title, message, type, link } = data;

        const newNotification = await NotificationModel.create({
            pengguna_id: userId,
            judul_notifikasi: title,
            isi_pesan: message,
            tipe_notifikasi: type,
            tautan_terkait: link || null,
            sudah_dibaca: false,
        });

        const user = await UserModel.findById(userId);
        return mapNotificationDBToModel({
            ...newNotification,
            nama_pengguna: user?.nama_lengkap,
        });
    }

    static async markAsRead(notificationId, userId) {
        const notification = await NotificationModel.markAsRead(notificationId, userId);
        if (!notification) return null;

        const user = await UserModel.findById(userId);
        return mapNotificationDBToModel({
            ...notification,
            nama_pengguna: user?.nama_lengkap,
        });
    }

    static async markAllAsRead(userId) {
        return await NotificationModel.markAllAsRead(userId);
    }

    static async deleteNotification(notificationId, userId) {
        const notification = await NotificationModel.findById(notificationId);
        if (!notification || notification.pengguna_id !== userId) {
            return false;
        }
        return await NotificationModel.deleteById(notificationId);
    }

    static async broadcastNotification(role, title, message, type, link = null) {
        const users = await UserModel.findByRole(role, { page: 1, limit: 999 });
        const notifications = [];

        for (const user of users.data) {
            const notif = await this.createNotification({
                userId: user.id,
                title,
                message,
                type,
                link,
            });
            notifications.push(notif);
        }

        return notifications;
    }
}

module.exports = NotificationService;