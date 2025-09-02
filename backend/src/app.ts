import express, { Request, Response } from 'express';
import cors from 'cors';

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

// Hard-coded exchange rates
export const EXCHANGE_RATES: Record<string, number> = {
  'TON-USDT': 123.45,
  'USDT-TON': 1 / 123.45
};

export function createApp() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.get('/api/exchange-rate', (req: Request, res: Response) => {
    const { from, to } = req.query;
    
    if (!from || !to) {
      return res.status(400).json({ 
        error: 'Missing required parameters: from and to' 
      });
    }

    const pair = `${from}-${to}`;
    const rate = EXCHANGE_RATES[pair];

    if (!rate) {
      return res.status(404).json({ 
        error: `Exchange rate not found for ${pair}` 
      });
    }

    const response: ExchangeRateResponse = {
      from: from as string,
      to: to as string,
      rate: parseFloat(rate.toFixed(6)),
      source: 'CoinGecko',
      timestamp: new Date().toISOString()
    };

    res.json(response);
  });

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    const response: HealthResponse = {
      status: 'OK',
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  });

  return app;
}
