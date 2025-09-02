import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export function createErrorHandler() {
  return (error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error('Unhandled error', {
      error: error.message,
      stack: error.stack,
      ip: req.ip,
      path: req.path
    });

    res.status(500).json({
      error: 'Internal server error'
    });
  };
}
