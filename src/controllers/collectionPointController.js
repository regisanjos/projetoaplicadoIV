const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const collectionPointController = {
  async create(req, res) {
    try {
      const { name, address } = req.body;

      if (!name || !address) {
        return res.status(400).json({ error: 'Nome e endereço são obrigatórios.' });
      }

      const collectionPoint = await prisma.collectionPoint.create({
        data: {
          name,
          address,
          adminId: req.user.id, // Admin logado
        },
      });

      res.status(201).json({ success: true, data: collectionPoint });
    } catch (error) {
      console.error('Erro ao criar ponto de coleta:', error.message);
      res.status(500).json({ error: 'Erro ao criar ponto de coleta.' });
    }
  },

  async getAll(req, res) {
    try {
      const collectionPoints = await prisma.collectionPoint.findMany();
      res.status(200).json({ success: true, data: collectionPoints });
    } catch (error) {
      console.error('Erro ao listar pontos de coleta:', error.message);
      res.status(500).json({ error: 'Erro ao listar pontos de coleta.' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, address } = req.body;

      const updatedCollectionPoint = await prisma.collectionPoint.update({
        where: { id },
        data: { name, address },
      });

      res.status(200).json({ success: true, data: updatedCollectionPoint });
    } catch (error) {
      console.error('Erro ao atualizar ponto de coleta:', error.message);
      res.status(500).json({ error: 'Erro ao atualizar ponto de coleta.' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      await prisma.collectionPoint.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar ponto de coleta:', error.message);
      res.status(500).json({ error: 'Erro ao deletar ponto de coleta.' });
    }
  },
};

module.exports = collectionPointController;
