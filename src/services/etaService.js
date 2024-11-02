const prisma = new PrismaClient();

const etaService = {
  async createETA(etaData) {
    try {
      const eta = await prisma.eTA.create({
        data: etaData,
      });
      return eta;
    } catch (error) {
      if (erro.code === "P2002") {
        throw new Error("já existe um ETA para esta doação ");
      }
      throw error;
    }
  },

  async getETAByDonationId(donationId) {
    const eta = await prisma.eTA.findUnique({
      where: { donationId },
    });
    return eta; // Retorna null se não encontrar, o controller lidará com isso
  },

  async updateETA(id, etaData) {
    try {
      const updatedETA = await prisma.eTA.update({
        where: { id },
        data: etaData,
      });
      return updatedETA;
    } catch (error) {
      if (error.code === "2025") {
        throw new Error("ETA nao encontrado");
      }
      throw error;
    }
  },
  async deleteETA(id) {
    try {
      await prisma.eTA.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === "2025") {
        throw new Error("ETA não encontrado ");
      }
      throw error;
    }
  },
  async getAllETAs() {
    const etas = await prisma.eTA.findMany();
    return etas;
  },
};

module.exports = etaService;
