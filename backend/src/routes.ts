import { Router } from 'express';
import { ExchangeController } from './controllers/exchangeController';

export function createRoutes(): Router {
  const router = Router();

  router.get('/api/exchange-rate', ExchangeController.getExchangeRate);
  router.get('/api/health', ExchangeController.getHealth);
  router.get('/api/cache/stats', ExchangeController.getCacheStats);

  return router;
}
