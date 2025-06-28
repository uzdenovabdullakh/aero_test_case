import { Router } from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';
import fileRouter from './file.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/file', fileRouter);

export default router;