import { Router } from 'express';
const router = Router();
import { handleGetByCategory, handleGetById } from '../controllers/recipesControllers';

router.get('/', handleGetByCategory);

router.get('/:id', handleGetById);

export default router;
