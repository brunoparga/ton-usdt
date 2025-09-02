import { Router } from 'express';
import { ExchangeController } from './controllers/exchangeController';

export function createRoutes(): Router {
  const router = Router();

  router.get('/api/exchange-rate', ExchangeController.getExchangeRate);
  router.get('/api/health', ExchangeController.getHealth);

  return router;
}
