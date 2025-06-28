import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/signup', AuthController.signUp);
authRouter.post('/signin', AuthController.signIn);
authRouter.post('/signin/new_token', AuthController.refreshToken);
authRouter.get('/info', AuthController.getUserInfo);
authRouter.get('/logout', AuthController.logout);

export default authRouter;