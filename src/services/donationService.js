import prisma from '../config/db';

const donationService = {
  
  async createDonation(donationData) {
    const { items, ...restOfDonationData } = donationData;

    
    if (items && items.some(item => !item.id || item.quantity <= 0)) {
      throw new Error('Cada item deve ter um ID válido e uma quantidade maior que zero');
    }

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
    const { items, ...restOfDonationData } = donationData;

   
    const existingDonation = await prisma.donation.findUnique({ where: { id: donationId } });
    if (!existingDonation) {
      throw new Error('Doação não encontrada para atualização');
    }

    
    if (items) {
      
      if (items.some(item => !item.id || item.quantity <= 0)) {
        throw new Error('Cada item deve ter um ID válido e uma quantidade maior que zero');
      }

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
      data: restOfDonationData,
      include: {
        user: true,
        disaster: true,
        items: true,
      },
    });

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

export default donationService;
