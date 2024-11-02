import { Router } from 'express';
import etaController from '../controllers/etaController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// Rota protegida para criar um novo ETA (associado a uma doação)
router.post('/', authMiddleware, etaController.create); 

// Rota protegida para buscar o ETA de uma doação pelo ID da doação
router.get('/donation/:donationId', authMiddleware, etaController.getByDonationId);

// Rota protegida para atualizar um ETA existente
router.put('/:id', authMiddleware, etaController.update); 

// Rota protegida para deletar um ETA
router.delete('/:id', authMiddleware, etaController.delete);

// Rota protegida para listar todos os ETAs
router.get('/', authMiddleware, etaController.getALLETAs);

export default router;