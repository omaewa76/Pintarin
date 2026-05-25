// src/controllers/notificationController.js
const { responseSuccess, responseError, asyncHandler } = require('../utils/errorHandler');
const NotificationService = require('../services/postgres/Notification');
const NotificationValidator = require('../validator/notification/index');

const getNotifications = asyncHandler(async (req, res) => {
    const validated = NotificationValidator.validateNotificationQuery(req.query);

    const result = await NotificationService.getUserNotifications(req.user.id, {
        onlyUnread: validated.only_unread,
        page: validated.page,
        limit: validated.limit
    });

    return responseSuccess(res, result, 'Data notifikasi berhasil diambil');
});

const markAsRead = asyncHandler(async (req, res) => {
    const { id } = NotificationValidator.validateNotificationId(req.params);

    const notification = await NotificationService.markAsRead(id, req.user.id);

    if (!notification) {
        return responseError(res, 'Notifikasi tidak ditemukan', 404);
    }

    return responseSuccess(res, notification, 'Notifikasi ditandai sebagai dibaca');
});

const markAllAsRead = asyncHandler(async (req, res) => {
    const count = await NotificationService.markAllAsRead(req.user.id);

    return responseSuccess(res, {
        marked_count: count
    }, `${count} notifikasi ditandai sebagai dibaca`);
});

const deleteNotification = asyncHandler(async (req, res) => {
    const { id } = NotificationValidator.validateNotificationId(req.params);

    const deleted = await NotificationService.deleteNotification(id, req.user.id);

    if (!deleted) {
        return responseError(res, 'Notifikasi tidak ditemukan', 404);
    }

    return responseSuccess(res, null, 'Notifikasi berhasil dihapus');
});

const getUnreadCount = asyncHandler(async (req, res) => {
    const count = await NotificationService.getUnreadCount(req.user.id);

    return responseSuccess(res, {
        unread_count: count
    }, 'Jumlah notifikasi belum dibaca berhasil diambil');
});

const broadcastNotification = asyncHandler(async (req, res) => {
    // Hanya Dinas yang bisa broadcast
    if (req.user.role !== 'dinas') {
        return responseError(res, 'Akses ditolak. Hanya admin Dinas yang bisa broadcast.', 403);
    }

    const validated = NotificationValidator.validateBroadcastNotification(req.body);

    const notifications = await NotificationService.broadcastNotification(
        validated.role,
        validated.title,
        validated.message,
        validated.type,
        validated.link
    );

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