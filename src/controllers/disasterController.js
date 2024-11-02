import disasterService from "../services/disasterService";

const disasterController = {
  async create(req, res) {
    try {
      const disaster = await disasterService.createDisaster(req.body);
      res.status(201).json(disaster); // Corrigido de 'josn' para 'json'
    } catch (error) {
      res.status(500).json({ error: error.message }); // Corrigido 'resizeTo' para 'res'
    }
  },

  async update(req, res) {
    try {
      const disasterId = parseInt(req.params.id); // Corrigido 'parms' para 'params'

      const updatedDisaster = await disasterService.updateDisaster(disasterId, req.body);
      res.json(updatedDisaster);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message }); // Corrigido 'erro' para 'error'
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

export default disasterController;