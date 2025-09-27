import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // Allow OPTIONS requests (preflight) to pass through
  if (req.method === 'OPTIONS') {
    return next();
  }

  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
  } else {
    try {
      const decoded = verifyToken(token as string);
      (req as any).user = decoded; // Adiciona o usuário decodificado ao objeto `req`
      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  }
};

