import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const etaService = {
  async createETA(etaData) {
    try {
      const eta = await prisma.eta.create({
        data: etaData,
      });
      return eta;
    } catch (error) {
      if (error.code === "P2002") {
        throw new Error("Já existe um ETA para esta doação.");
      }
      throw error;
    }
  },

  async getETAByDonationId(donationId) {
    const eta = await prisma.eta.findUnique({
      where: { donationId },
    });
    return eta; 
  },

  async updateETA(id, etaData) {
    try {
      const updatedETA = await prisma.eta.update({
        where: { id },
        data: etaData,
      });
      return updatedETA;
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error("ETA não encontrado para atualização.");
      }
      throw error;
    }
  },

  async deleteETA(id) {
    try {
      await prisma.eta.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error("ETA não encontrado para deleção.");
      }
      throw error;
    }
  },

  async getAllETAs() {
    const etas = await prisma.eta.findMany();
    return etas;
  },
};

export default etaService;
