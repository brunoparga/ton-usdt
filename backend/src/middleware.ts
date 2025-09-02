import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import logger from './logger';
import { config } from './config';
import { createErrorHandler } from './middleware/errorHandler';

export function createRateLimiter() {
  return rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
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

export { createErrorHandler };
