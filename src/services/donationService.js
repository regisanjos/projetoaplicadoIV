import prisma from '../config/db';

const donationService = {
  // Criar uma nova doação
  async createDonation(donationData) {
    // Lógica para lidar com a criação de DonationItems, se necessário
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
      include: { items: true }, // Inclui os itens relacionados na resposta
    });

    return donation;
  },

  // Buscar todas as doações
  async getAllDonations() {
    const donations = await prisma.donation.findMany({
      include: { 
        user: true, 
        disaster: true,
        items: true 
      },
    });
    return donations;
  },

  // Buscar uma doação pelo ID
  async getDonationById(donationId) {
    const donation = await prisma.donation.findUnique({
      where: { id: donationId },
      include: { 
        user: true, 
        disaster: true,
        items: true 
      },
    });
    if (!donation) {
      throw new Error('Doação não encontrada');
    }
    return donation;
  },

  // Atualizar uma doação
  async updateDonation(donationId, donationData) {
    // Lógica para lidar com a atualização de DonationItems, se necessário
    // ...

    const updatedDonation = await prisma.donation.update({
      where: { id: donationId },
      data: donationData,
      include: { 
        user: true, 
        disaster: true,
        items: true 
      },
    });
    return updatedDonation;
  },

  // Deletar uma doação
  async deleteDonation(donationId) {
    await prisma.donation.delete({
      where: { id: donationId },
    });
  },
};

export default donationService;