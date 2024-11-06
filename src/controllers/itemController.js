const itemService = require('../services/itemService');


const itemController = {

  async create(req, res) {
    try {
      const newItem = await itemService.createItem(req.body); 
      res.status(201).json(newItem); 
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  },

 
  async getAll(req, res) {
    try {
      const items = await itemService.getAllItems(); 
      res.json(items); 
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  },

  
  async getById(req, res) {
    try {
      const itemId = parseInt(req.params.id); 
      const item = await itemService.getItemById(itemId);

      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado' });
      }

      res.json(item); 
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  },

 
  async update(req, res) {
    try {
      const itemId = parseInt(req.params.id); 
      const updatedItem = await itemService.updateItem(itemId, req.body); 
      if (!updatedItem) {
        return res.status(404).json({ error: 'Item não encontrado' });
      }

      res.json(updatedItem); 
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  },

  
  async delete(req, res) {
    try {
      const itemId = parseInt(req.params.id); 
      await itemService.deleteItem(itemId); 
      res.status(204).end(); 
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  },
};

module.exports =  itemController;
