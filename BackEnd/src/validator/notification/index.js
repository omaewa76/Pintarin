// src/validator/notification/index.js

const InvariantError = require('../../exceptions/InvariantError');
const {
    notificationQuerySchema,
    notificationIdSchema,
    createNotificationSchema,
    broadcastNotificationSchema
} = require('./schema');

const NotificationValidator = {
    validateNotificationQuery: (query) => {
        const result = notificationQuerySchema.validate(query);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateNotificationId: (params) => {
        const result = notificationIdSchema.validate(params);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateCreateNotification: (payload) => {
        const result = createNotificationSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateBroadcastNotification: (payload) => {
        const result = broadcastNotificationSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    }
};

module.exports = NotificationValidator;