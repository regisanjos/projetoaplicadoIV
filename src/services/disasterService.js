import prisma from '../config/db';

const disasterService = {
  // Criar um novo registro de desastre
  async createDisaster(disasterData) {
    // Validações adicionais podem ser feitas aqui, como verificar campos obrigatórios
    const disaster = await prisma.disaster.create({
      data: disasterData,
    });
    return disaster;
  },

  // Buscar todos os registros de desastres
  async getAllDisasters() {
    const disasters = await prisma.disaster.findMany();
    return disasters;
  },

  // Buscar um desastre pelo ID
  async getDisasterById(disasterId) {
    const disaster = await prisma.disaster.findUnique({
      where: { id: disasterId },
    });
    if (!disaster) {
      throw new Error('Desastre não encontrado');
    }
    return disaster;
  },

  // Atualizar um desastre
  async updateDisaster(disasterId, disasterData) {
    try {
      const updatedDisaster = await prisma.disaster.update({
        where: { id: disasterId },
        data: disasterData,
      });
      return updatedDisaster;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Desastre não encontrado para atualização');
      }
      throw error;
    }
  },

  // Deletar um desastre
  async deleteDisaster(disasterId) {
    try {
      await prisma.disaster.delete({
        where: { id: disasterId },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Desastre não encontrado para deleção');
      }
      throw error;
    }
  },
};

export default disasterService;