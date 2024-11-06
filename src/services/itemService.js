const prisma = require('../config/db');
const Joi = require('joi');

const itemService = {
  
  validateItemData(itemData) {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        'string.empty': 'O nome do item é obrigatório',
      }),
      category: Joi.string().required().messages({
        'string.empty': 'A categoria do item é obrigatória',
      }),
      quantity: Joi.number().integer().min(1).required().messages({
        'number.base': 'A quantidade deve ser um número inteiro',
        'number.min': 'A quantidade deve ser pelo menos 1',
      }),
    });

    const { error } = schema.validate(itemData);
    if (error) {
      throw new Error(error.details[0].message);
    }
  },

  
  async createItem(itemData) {
    this.validateItemData(itemData); // Validação dos dados

    try {
      const item = await prisma.item.create({
        data: itemData,
      });
      return item;
    } catch (error) {
      throw new Error(`Erro ao criar item: ${error.message}`);
    }
  },

  
  async getAllItems() {
    try {
      const items = await prisma.item.findMany();
      return items;
    } catch (error) {
      throw new Error(`Erro ao buscar todos os itens: ${error.message}`);
    }
  },

  
  async getItemById(itemId) {
    try {
      const item = await prisma.item.findUnique({
        where: { id: itemId },
      });
      if (!item) {
        throw new Error('Item não encontrado');
      }
      return item;
    } catch (error) {
      throw new Error(`Erro ao buscar item: ${error.message}`);
    }
  },

  
  async updateItem(itemId, itemData) {
    this.validateItemData(itemData); // Validação dos dados

    try {
      const updatedItem = await prisma.item.update({
        where: { id: itemId },
        data: itemData,
      });
      return updatedItem;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Item não encontrado para atualização');
      }
      throw new Error(`Erro ao atualizar item: ${error.message}`);
    }
  },

  
  async deleteItem(itemId) {
    try {
      await prisma.item.delete({
        where: { id: itemId },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Item não encontrado para deleção');
      }
      throw new Error(`Erro ao deletar item: ${error.message}`);
    }
  },
};

module.exports = itemService;
