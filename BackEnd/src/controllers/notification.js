// src/controllers/notification.js

const { responseSuccess, responseError, asyncHandler } = require('../utils/errorHandler');
const NotificationService = require('../services/postgres/notification');
const NotificationValidator = require('../validator/notification/index');

// Controller untuk manajemen notifikasi pengguna, termasuk peng
const getNotifications = asyncHandler(async (req, res) => {
    const validated = NotificationValidator.validateNotificationQuery(req.query);

    const result = await NotificationService.getUserNotifications(req.user.id, {
        onlyUnread: validated.only_unread,
        page: validated.page,
        limit: validated.limit
    });

    return responseSuccess(res, result, 'Data notifikasi berhasil diambil');
});

// Fungsi untuk menandai notifikasi sebagai dibaca, hanya bisa diakses oleh pemilik notifikasi tersebut
const markAsRead = asyncHandler(async (req, res) => {
    const { id } = NotificationValidator.validateNotificationId(req.params);

    // Validasi parameter ID untuk menandai notifikasi sebagai dibaca, dan pastikan notifikasi yang diminta ada dan milik pengguna yang sedang login
    const notification = await NotificationService.markAsRead(id, req.user.id);

    if (!notification) {
        return responseError(res, 'Notifikasi tidak ditemukan', 404);
    }

    return responseSuccess(res, notification, 'Notifikasi ditandai sebagai dibaca');
});

// Fungsi untuk menandai semua notifikasi sebagai dibaca, hanya bisa diakses oleh pemilik notifikasi tersebut
const markAllAsRead = asyncHandler(async (req, res) => {
    const count = await NotificationService.markAllAsRead(req.user.id);

    return responseSuccess(res, {
        marked_count: count
    }, `${count} notifikasi ditandai sebagai dibaca`);
});

// Fungsi untuk menghapus notifikasi, hanya bisa diakses oleh pemilik notifikasi tersebut
const deleteNotification = asyncHandler(async (req, res) => {
    const { id } = NotificationValidator.validateNotificationId(req.params);

    const deleted = await NotificationService.deleteNotification(id, req.user.id);

    if (!deleted) {
        return responseError(res, 'Notifikasi tidak ditemukan', 404);
    }

    return responseSuccess(res, null, 'Notifikasi berhasil dihapus');
});

// Fungsi untuk mengambil jumlah notifikasi yang belum dibaca, hanya bisa diakses oleh pemilik notifikasi tersebut
const getUnreadCount = asyncHandler(async (req, res) => {
    const count = await NotificationService.getUnreadCount(req.user.id);

    return responseSuccess(res, {
        unread_count: count
    }, 'Jumlah notifikasi belum dibaca berhasil diambil');
});

// Fungsi untuk melakukan broadcast notifikasi ke semua pengguna dengan peran tertentu, hanya bisa diakses oleh admin Dinas
const broadcastNotification = asyncHandler(async (req, res) => {
    if (req.user.role !== 'dinas') {
        return responseError(res, 'Akses ditolak. Hanya admin Dinas yang bisa broadcast.', 403);
    }

    const validated = NotificationValidator.validateBroadcastNotification(req.body);

    // Validasi data input untuk broadcast notifikasi dan kirim notifikasi ke semua pengguna dengan peran yang ditargetkan
    const notifications = await NotificationService.broadcastNotification(
        validated.role,
        validated.title,
        validated.message,
        validated.type,
        validated.link
    );

    // Simpan notifikasi untuk semua pengguna yang menerima broadcast notifikasi
    return responseSuccess(res, {
        role: validated.role,
        recipient_count: notifications.length,
        notifications_sent: notifications.length
    }, `Broadcast notifikasi berhasil dikirim ke ${notifications.length} penerima`);
});

module.exports = {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadCount,
    broadcastNotification
};