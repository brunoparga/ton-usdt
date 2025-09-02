import { Request, Response } from 'express';
import logger from '../logger';
import { ExchangeRateService } from '../services/exchangeService';
import { ApiError, HealthResponse } from '../types';

export class ExchangeController {
  static async getExchangeRate(req: Request, res: Response): Promise<void> {
    const { from, to } = req.query;
    
    // Validate required parameters
    if (!from || !to) {
      logger.warn('Missing required parameters', { from, to, ip: req.ip });
      res.status(400).json({ 
        error: 'Missing required parameters: from and to' 
      } as ApiError);
      return;
    }

    try {
      const response = ExchangeRateService.getExchangeRate(from as string, to as string);
      
      logger.info('Exchange rate requested', { 
        pair: `${response.from}-${response.to}`, 
        rate: response.rate, 
        ip: req.ip 
      });
      
      res.json(response);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.warn('Exchange rate error', { 
        error: errorMessage, 
        from, 
        to, 
        ip: req.ip 
      });
      
      const statusCode = errorMessage.includes('not found') ? 404 : 400;
      res.status(statusCode).json({ error: errorMessage } as ApiError);
    }
  }

  static getHealth(req: Request, res: Response): void {
    const response: HealthResponse = {
      status: 'OK',
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  }
}
