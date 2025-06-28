import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { extractErrorMessage } from '@/utils/helpers';

class AuthController {
  async signUp(req: Request, res: Response) {
    try {
      const { id, password } = req.body;
      const tokens = await authService.signUp(id, password);
      res.json(tokens);
    } catch (error) {
      res.status(400).json({ message: extractErrorMessage(error) });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const { id, password } = req.body;
      const tokens = await authService.signIn(id, password);
      res.json(tokens);
    } catch (error) {
      res.status(401).json({ message: extractErrorMessage(error) });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refreshToken(refreshToken);
      res.json(tokens);
    } catch (error) {
      res.status(401).json({ message: extractErrorMessage(error) });
    }
  }

  async getUserInfo(req: Request, res: Response) {
    try {
      res.json({ id: req.user?.id });
    } catch (error) {
      res.status(500).json({ message: extractErrorMessage(error) });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      await authService.logout(refreshToken);
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: extractErrorMessage(error) });
    }
  }
}

export default new AuthController();