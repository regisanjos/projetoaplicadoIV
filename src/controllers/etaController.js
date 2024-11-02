import etaService from '../services/etaService';
import { body, param, validationResult } from 'express-validator';

const etaController = {
  validate(method) {
    switch (method) {
      case 'createETA': {
        return [
          body('donationId').isInt().withMessage('O ID da doação deve ser um número inteiro'),
          body('estimatedArrival').isISO8601().withMessage('A data de chegada estimada deve estar em formato ISO 8601'),
          body('currentLocation').notEmpty().withMessage('A localização atual é obrigatória'),
        ];
      }
      case 'getETAById':
      case 'updateETA':
      case 'deleteETA': {
        return [
          param('id').isInt().withMessage('O ID do ETA deve ser um número inteiro'),
        ];
      }
      default:
        return [];
    }
  },

  
  create: [
    ...etaController.validate('createETA'),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const eta = await etaService.createETA(req.body);
        res.status(201).json(eta);
      } catch (error) {
        if (error.code === 'P2002') {
          return res.status(400).json({ error: 'Já existe um ETA para esta doação' });
        }
        res.status(500).json({ error: error.message });
      }
    },
  ],

  
  getByDonationId: [
    param('donationId').isInt().withMessage('O ID da doação deve ser um número inteiro'),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const donationId = parseInt(req.params.donationId);
        const eta = await etaService.getETAByDonationId(donationId);

        if (!eta) {
          return res.status(404).json({ error: 'ETA não encontrado para esta doação' });
        }

        res.status(200).json(eta);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao obter ETA', error });
      }
    },
  ],

  
  update: [
    ...etaController.validate('updateETA'),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const etaId = parseInt(req.params.id);
        const updatedETA = await etaService.updateETA(etaId, req.body);

        if (!updatedETA) {
          return res.status(404).json({ error: 'ETA não encontrado' });
        }

        res.status(200).json(updatedETA);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar ETA', error });
      }
    },
  ],

 
  delete: [
    ...etaController.validate('deleteETA'),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const etaId = parseInt(req.params.id);
        await etaService.deleteETA(etaId);

        res.status(204).end(); 
      } catch (error) {
        if (error.code === 'P2025') {
          return res.status(404).json({ error: 'ETA não encontrado' });
        }
        res.status(500).json({ message: 'Erro ao excluir ETA', error });
      }
    },
  ],

  
  getAllETAs: async (req, res) => {
    try {
      const etas = await etaService.getAllETAs();
      res.status(200).json(etas);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar ETAs' });
    }
  },
};

export default etaController;
