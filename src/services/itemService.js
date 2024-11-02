import prisma from '../config/db';

const itemService = {
  // Criar um novo item
  async createItem(itemData) {
    const item = await prisma.item.create({
      data: itemData,
    });
    return item;
  },

  // Buscar todos os itens
  async getAllItems() {
    const items = await prisma.item.findMany();
    return items;
  },

  // Buscar um item pelo ID
  async getItemById(itemId) {
    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });
    if (!item) {
      throw new Error('Item não encontrado');
    }
    return item;
  },

  // Atualizar um item
  async updateItem(itemId, itemData) {
    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: itemData,
    });
    return updatedItem;
  },

  // Deletar um item
  async deleteItem(itemId) {
    await prisma.item.delete({
      where: { id: itemId },
    });
  },
};

export default itemService;