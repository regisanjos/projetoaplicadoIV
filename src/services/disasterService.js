import prisma from '../config/db';
import Joi from 'joi';

const disasterService = {
 
  validateDisasterData(disasterData) {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        'string.empty': 'O nome do desastre é obrigatório',
      }),
      location: Joi.string().required().messages({
        'string.empty': 'A localização do desastre é obrigatória',
      }),
      startDate: Joi.date().required().messages({
        'date.base': 'A data de início é obrigatória e deve estar no formato de data',
      }),
      endDate: Joi.date().optional(),
      status: Joi.string().valid('ACTIVE', 'INACTIVE', 'ENDED').required(),
      description: Joi.string().optional(),
      imageUrl: Joi.string().uri().optional(),
    });

    const { error } = schema.validate(disasterData);
    if (error) {
      throw new Error(error.details[0].message);
    }
  },

 
  async createDisaster(disasterData) {
    
    this.validateDisasterData(disasterData);

    const disaster = await prisma.disaster.create({
      data: disasterData,
    });
    return disaster;
  },

  
  async getAllDisasters() {
    const disasters = await prisma.disaster.findMany();
    return disasters;
  },

  
  async getDisasterById(disasterId) {
    const disaster = await prisma.disaster.findUnique({
      where: { id: disasterId },
    });
    if (!disaster) {
      throw new Error('Desastre não encontrado');
    }
    return disaster;
  },

  
  async updateDisaster(disasterId, disasterData) {
    
    this.validateDisasterData(disasterData);

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
