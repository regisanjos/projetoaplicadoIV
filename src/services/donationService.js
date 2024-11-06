const prisma = require('../config/db');
const Joi = require('joi');
const notificationService = require('./notificationService'); // Certifique-se de que este service esteja implementado e configurado

const donationService = {
  
  validateDonationData(donationData) {
    const schema = Joi.object({
      userId: Joi.number().integer().required().messages({
        'number.base': 'O ID do usuário deve ser um número inteiro',
        'any.required': 'O ID do usuário é obrigatório',
      }),
      disasterId: Joi.number().integer().required().messages({
        'number.base': 'O ID do desastre deve ser um número inteiro',
        'any.required': 'O ID do desastre é obrigatório',
      }),
      type: Joi.string().required().messages({
        'string.empty': 'O tipo de doação é obrigatório',
      }),
      description: Joi.string().required().messages({
        'string.empty': 'A descrição da doação é obrigatória',
      }),
      status: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED').default('PENDING'),
      items: Joi.array().items(
        Joi.object({
          id: Joi.number().integer().required().messages({
            'number.base': 'O ID do item deve ser um número inteiro',
            'any.required': 'Cada item deve ter um ID',
          }),
          quantity: Joi.number().integer().min(1).required().messages({
            'number.base': 'A quantidade do item deve ser um número inteiro',
            'number.min': 'A quantidade do item deve ser maior que zero',
            'any.required': 'Cada item deve ter uma quantidade',
          }),
        })
      ).required(),
    });

    const { error } = schema.validate(donationData);
    if (error) {
      throw new Error(error.details[0].message);
    }
  },

  
  async createDonation(donationData) {
    this.validateDonationData(donationData); // Validação de dados

    const { items, ...restOfDonationData } = donationData;

    const donation = await prisma.donation.create({
      data: {
        ...restOfDonationData,
        items: {
          create: items.map(item => ({
            itemId: item.id,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    return donation;
  },

  
  async getAllDonations() {
    const donations = await prisma.donation.findMany({
      include: {
        user: true,
        disaster: true,
        items: true,
      },
    });
    return donations;
  },

  
  async getDonationById(donationId) {
    const donation = await prisma.donation.findUnique({
      where: { id: donationId },
      include: {
        user: true,
        disaster: true,
        items: true,
      },
    });
    if (!donation) {
      throw new Error('Doação não encontrada');
    }
    return donation;
  },

  
  async updateDonation(donationId, donationData) {
    this.validateDonationData(donationData); // Validação de dados

    const { items, status, ...restOfDonationData } = donationData;

    const existingDonation = await prisma.donation.findUnique({
      where: { id: donationId },
    });
    if (!existingDonation) {
      throw new Error('Doação não encontrada para atualização');
    }

    
    if (items) {
      await prisma.donationItem.deleteMany({ where: { donationId } });
      await prisma.donationItem.createMany({
        data: items.map(item => ({
          donationId,
          itemId: item.id,
          quantity: item.quantity,
        })),
      });
    }

    const updatedDonation = await prisma.donation.update({
      where: { id: donationId },
      data: { ...restOfDonationData, status },
      include: {
        user: true,
        disaster: true,
        items: true,
      },
    });

    
    if (status && status !== existingDonation.status) {
      const userId = updatedDonation.userId;
      const title = 'Atualização de Doação';
      const message = `Sua doação foi atualizada para o status: ${status}.`;
      await notificationService.createNotification(userId, title, message);
    }

    return updatedDonation;
  },

  
  async deleteDonation(donationId) {
    try {
      await prisma.donation.delete({
        where: { id: donationId },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Doação não encontrada para deleção');
      }
      throw error;
    }
  },
};

module.exports = donationService;
