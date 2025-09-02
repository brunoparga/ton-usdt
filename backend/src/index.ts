import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Types
interface ExchangeRateResponse {
  from: string;
  to: string;
  rate: number;
  source: string;
  timestamp: string;
}

interface HealthResponse {
  status: string;
  timestamp: string;
}

// Hard-coded exchange rates
const EXCHANGE_RATES: Record<string, number> = {
  'TON-USDT': 123.45,
  'USDT-TON': 1 / 123.45
};

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/exchange-rate`);
});
