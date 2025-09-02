import express from 'express';
import cors from 'cors';
import { createRateLimiter, createRequestLogger, createErrorHandler } from './middleware';
import { createRoutes } from './routes';

export function createApp() {
  const app = express();

  // Middleware
  app.use(createRateLimiter());
  app.use(cors());
  app.use(express.json());
  app.use(createRequestLogger());

  // Routes
  app.use(createRoutes());

  // Error handling (must be last)
  app.use(createErrorHandler());

  return app;
}
