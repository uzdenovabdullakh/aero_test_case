import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
import { AuthRequest } from '@/types/auth-request.type';

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    next({ message: 'Authentication failed' });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as { userId: string };
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    next({ message: 'Authentication failed' });
  }
};
