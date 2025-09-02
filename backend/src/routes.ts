import { Request, Response, Router } from 'express';
import logger from './logger';
import { validateCurrency, sanitizeCurrency } from './validation';
import { EXCHANGE_RATES } from './constants';

// Types
export interface ExchangeRateResponse {
  from: string;
  to: string;
  rate: number;
  source: string;
  timestamp: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
}

export function createRoutes(): Router {
  const router = Router();

  // Exchange rate endpoint
  router.get('/api/exchange-rate', (req: Request, res: Response) => {
    const { from, to } = req.query;
    
    // Validate required parameters
    if (!from || !to) {
      logger.warn('Missing required parameters', { from, to, ip: req.ip });
      return res.status(400).json({ 
        error: 'Missing required parameters: from and to' 
      });
    }

    // Validate and sanitize input
    const fromError = validateCurrency(from);
    const toError = validateCurrency(to);
    
    if (fromError) {
      logger.warn('Invalid from parameter', { from, error: fromError, ip: req.ip });
      return res.status(400).json({ 
        error: `Invalid 'from' parameter: ${fromError}` 
      });
    }
    
    if (toError) {
      logger.warn('Invalid to parameter', { to, error: toError, ip: req.ip });
      return res.status(400).json({ 
        error: `Invalid 'to' parameter: ${toError}` 
      });
    }

    // Sanitize inputs
    const fromCurrency = sanitizeCurrency(from as string);
    const toCurrency = sanitizeCurrency(to as string);

    // Check for same currency
    if (fromCurrency === toCurrency) {
      logger.warn('Same currency requested', { fromCurrency, toCurrency, ip: req.ip });
      return res.status(400).json({ 
        error: 'From and to currencies cannot be the same' 
      });
    }

    const pair = `${fromCurrency}-${toCurrency}`;
    const rate = EXCHANGE_RATES[pair];

    if (!rate) {
      logger.warn('Exchange rate not found', { pair, ip: req.ip });
      return res.status(404).json({ 
        error: `Exchange rate not found for ${pair}. Supported pairs: TON-USDT, USDT-TON` 
      });
    }

    const response: ExchangeRateResponse = {
      from: fromCurrency,
      to: toCurrency,
      rate: parseFloat(rate.toFixed(6)),
      source: 'CoinGecko',
      timestamp: new Date().toISOString()
    };

    logger.info('Exchange rate requested', { 
      pair, 
      rate, 
      ip: req.ip 
    });
    res.json(response);
  });

  // Health check endpoint
  router.get('/api/health', (req: Request, res: Response) => {
    const response: HealthResponse = {
      status: 'OK',
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  });

  return router;
}
