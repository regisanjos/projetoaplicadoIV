const { PrismaClient } = require('@prisma/client');
const Joi = require('joi');

const prisma = new PrismaClient();

const etaService = {
 
  validateETAData(etaData) {
    const schema = Joi.object({
      donationId: Joi.number().integer().required().messages({
        'number.base': 'O ID da doação deve ser um número inteiro',
        'any.required': 'O ID da doação é obrigatório',
      }),
      estimatedArrival: Joi.date().iso().required().messages({
        'date.format': 'A data de chegada estimada deve estar no formato ISO 8601',
        'any.required': 'A data de chegada estimada é obrigatória',
      }),
      currentLocation: Joi.string().required().messages({
        'string.empty': 'A localização atual é obrigatória',
      }),
      status: Joi.string().optional(),
      transporter: Joi.string().optional(),
      trackingNumber: Joi.string().optional(),
    });

    const { error } = schema.validate(etaData);
    if (error) {
      throw new Error(error.details[0].message);
    }
  },

  
  async createETA(etaData) {
    this.validateETAData(etaData); 

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
    if (!eta) {
      throw new Error("ETA não encontrado para esta doação.");
    }
    return eta;
  },

  
  async updateETA(id, etaData) {
    this.validateETAData(etaData); // Validação dos dados

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

module.exports = etaService;
