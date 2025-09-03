/**
 * MongoDB database service implementation (example for modularity)
 * This demonstrates how easy it would be to switch from PostgreSQL to MongoDB
 */

import { DatabaseService, ExchangeRateRecord } from './interfaces';
import logger from '../logger';

export class MongoService implements DatabaseService {
  constructor(private connection: any) {} // MongoDB connection would go here

  async saveExchangeRate(record: Omit<ExchangeRateRecord, 'id' | 'created_at'>): Promise<ExchangeRateRecord> {
    // MongoDB implementation would go here
    // Example: await this.connection.collection('exchange_rates').insertOne(record);
    logger.info('MongoDB saveExchangeRate called (not implemented)', record);
    throw new Error('MongoDB implementation not provided - this is just an example');
  }

  async getLatestExchangeRate(from: string, to: string, source: string): Promise<ExchangeRateRecord | null> {
    // MongoDB implementation would go here
    logger.info('MongoDB getLatestExchangeRate called (not implemented)', { from, to, source });
    throw new Error('MongoDB implementation not provided - this is just an example');
  }


}
