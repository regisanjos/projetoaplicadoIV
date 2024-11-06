const prisma = require('../config/db');

const notificationService = {
  
  async createNotification(userId, title, message) {
    try {
      const notification = await prisma.notification.create({
        data: {
          userId,
          title,
          message,
        },
      });
      return notification;
    } catch (error) {
      throw new Error(`Erro ao criar notificação: ${error.message}`);
    }
  },

  
  async getUserNotifications(userId) {
    try {
      const notifications = await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      return notifications;
    } catch (error) {
      throw new Error(`Erro ao buscar notificações para o usuário: ${error.message}`);
    }
  },
};

module.exports = notificationService;
