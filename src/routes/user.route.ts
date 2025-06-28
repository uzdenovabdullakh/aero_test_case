import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;