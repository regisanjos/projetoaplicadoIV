const disasterService = require("../services/disasterService");

const disasterController = {
  async getAllDisasters(req, res) {
    try {
      const disasters = await disasterService.getAllDisasters();
      res.json(disasters);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar desastres' });
    }
  },

  async getDisasterById(req, res) {
    try {
      const disasterId = parseInt(req.params.id);
      const disaster = await disasterService.getDisasterById(disasterId);
      if (!disaster) {
        return res.status(404).json({ error: 'Desastre não encontrado' });
      }
      res.json(disaster);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const disaster = await disasterService.createDisaster(req.body);
      res.status(201).json(disaster);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const disasterId = parseInt(req.params.id);
      const updatedDisaster = await disasterService.updateDisaster(disasterId, req.body);
      res.json(updatedDisaster);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const disasterId = parseInt(req.params.id);
      await disasterService.deleteDisaster(disasterId);
      res.json({ message: 'Desastre deletado com sucesso' });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },
};

module.exports = disasterController;
