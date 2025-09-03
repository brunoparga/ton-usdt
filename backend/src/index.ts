import { createApp } from './app';
import { config } from './config';
import { PrismaService } from './database/prismaService';
import { ExchangeRateService } from './services/exchangeService';
import logger from './logger';

async function startServer() {
  try {
    // Initialize Prisma service
    const dbService = new PrismaService();
    ExchangeRateService.setDatabaseService(dbService);

    // Create and start the app
    const app = createApp();

    app.listen(config.server.port, () => {
      logger.info(`Server running on port ${config.server.port}`);
      logger.info(`API available at http://localhost:${config.server.port}/api/exchange-rate`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('Shutting down server...');
      await dbService.disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      logger.info('Shutting down server...');
      await dbService.disconnect();
      process.exit(0);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
