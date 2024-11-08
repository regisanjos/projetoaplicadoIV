
const prisma = require('../config/db');
const notificationService = require('./notificationService');

const donationService = {
    async updateDonation(donationId, donationData) {
        const updatedDonation = await prisma.donation.update({
            where: { id: donationId },
            data: donationData,
        });

        if (donationData.status) {
            const userId = updatedDonation.userId;
            const title = 'Atualização de Doação';
            const message = `Sua doação foi atualizada para o status: ${donationData.status}.`;
            await notificationService.createNotification(userId, title, message);
        }

        return updatedDonation;
    },
};
module.exports = donationService;