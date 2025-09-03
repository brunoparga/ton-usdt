import { createApp } from './app';
import { config } from './config';
import { PostgresConnection, PostgresService, DatabaseMigrations } from './database';
import { ExchangeRateService } from './services/exchangeService';
import logger from './logger';

async function startServer() {
  try {
    // Initialize database connection
    const dbConnection = new PostgresConnection(config.database);
    await dbConnection.connect();

    // Run migrations
    const migrations = new DatabaseMigrations(dbConnection);
    await migrations.runMigrations();

    // Initialize database service
    const dbService = new PostgresService(dbConnection);
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
      await dbConnection.disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      logger.info('Shutting down server...');
      await dbConnection.disconnect();
      process.exit(0);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
