import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import logger from './logger';

export function createRateLimiter() {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
      error: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
}

export function createRequestLogger() {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.path}`, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      query: req.query
    });
    next();
  };
}
