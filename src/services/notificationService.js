const prisma = require('../config/db');



const notificationService = {
  async createNotification(userId, title, message) {
    return await prisma.notification.create({
      data: {
        userId,
        title,
        message,
      },
    });
  },

  async getUserNotifications(userId) {
    return await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },
};

module.exports = notificationService;
