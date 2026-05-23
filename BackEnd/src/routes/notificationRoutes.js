// src/routes/notificationRoutes.js
const express = require('express');
const {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadCount,
    broadcastNotification
} = require('../controllers/notificationController');
const { authenticate } = require('../middleware/auth');
const { requireDinas } = require('../middleware/roleCheck');
const validationAdapter = require('../middleware/validationAdapter');
const NotificationValidator = require('../validator/notification/index');

const router = express.Router();

// Notifikasi user yang login
router.get('/',
    authenticate,
    validationAdapter(NotificationValidator.validateNotificationQuery, 'query'),
    getNotifications
);

// Jumlah notifikasi belum dibaca
router.get('/unread-count',
    authenticate,
    getUnreadCount
);

// Tandai notifikasi sebagai dibaca
router.patch('/:id/read',
    authenticate,
    validationAdapter(NotificationValidator.validateNotificationId, 'params'),
    markAsRead
);

// Tandai semua notifikasi sebagai dibaca
router.patch('/read-all',
    authenticate,
    markAllAsRead
);

// Hapus notifikasi
router.delete('/:id',
    authenticate,
    validationAdapter(NotificationValidator.validateNotificationId, 'params'),
    deleteNotification
);

// Broadcast notifikasi (Dinas only)
router.post('/broadcast',
    authenticate,
    requireDinas,
    validationAdapter(NotificationValidator.validateBroadcastNotification, 'body'),
    broadcastNotification
);

module.exports = router;