import { Request, Response } from 'express';
import logger from '../logger';
import { ExchangeRateService } from '../services/exchangeService';
import { ApiError, HealthResponse } from '../types';

export class ExchangeController {
  static async getExchangeRate(req: Request, res: Response): Promise<void> {
    const { from, to, provider } = req.query;
    
    // Validate required parameters
    if (!from || !to) {
      logger.warn('Missing required parameters', { from, to, ip: req.ip });
      res.status(400).json({ 
        error: 'Missing required parameters: from and to' 
      } as ApiError);
      return;
    }

    // Use provider from query param, default to 'coingecko'
    const providerName = (provider as string) || 'coingecko';

    try {
      const response = await ExchangeRateService.getExchangeRate(
        from as string, 
        to as string, 
        providerName
      );
      
      logger.info('Exchange rate requested', { 
        pair: `${response.from}-${response.to}`, 
        rate: response.rate, 
        provider: providerName,
        ip: req.ip 
      });
      
      res.json(response);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.warn('Exchange rate error', { 
        error: errorMessage, 
        from, 
        to, 
        provider: providerName,
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

  static getCacheStats(req: Request, res: Response): void {
    try {
      const stats = ExchangeRateService.getCacheStats();
      res.json({
        cache: stats,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Failed to get cache stats', { error });
      res.status(500).json({ error: 'Failed to get cache statistics' } as ApiError);
    }
  }
}
