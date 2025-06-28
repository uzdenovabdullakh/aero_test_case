import { Response } from 'express';
import userService from '../services/user.service';
import { extractErrorMessage } from '@/utils/helpers';
import { AuthRequest } from '@/types/auth-request.type';

class UserController {
  async getUser(req: AuthRequest, res: Response) {
    try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: extractErrorMessage(error) });
    }
  }

  async updateUser(req: AuthRequest, res: Response) {
    try {
      const userId = req.params.id;
      const { password } = req.body;
      const updatedUser = await userService.updateUser(userId, password);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: extractErrorMessage(error) });
    }
  }

  async deleteUser(req: AuthRequest, res: Response) {
    try {
      const userId = req.params.id;
      await userService.deleteUser(userId);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: extractErrorMessage(error) });
    }
  }
}

export default new UserController();
