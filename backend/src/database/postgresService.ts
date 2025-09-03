/**
 * PostgreSQL database service implementation
 */

import { PostgresConnection } from './postgresConnection';
import { DatabaseService, ExchangeRateRecord } from './interfaces';
import logger from '../logger';

export class PostgresService implements DatabaseService {
  constructor(private connection: PostgresConnection) {}

  async saveExchangeRate(record: Omit<ExchangeRateRecord, 'id' | 'created_at'>): Promise<ExchangeRateRecord> {
    const client = await this.connection.getClient();
    
    try {
      const query = `
        INSERT INTO exchange_rates (from_currency, to_currency, rate, source, timestamp)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, from_currency, to_currency, rate, source, timestamp, created_at
      `;
      
      const values = [
        record.from_currency,
        record.to_currency,
        record.rate,
        record.source,
        record.timestamp
      ];

      const result = await client.query(query, values);
      const savedRecord = result.rows[0];
      
      logger.info('Exchange rate saved to database', {
        id: savedRecord.id,
        pair: `${savedRecord.from_currency}-${savedRecord.to_currency}`,
        rate: savedRecord.rate
      });

      return {
        id: savedRecord.id,
        from_currency: savedRecord.from_currency,
        to_currency: savedRecord.to_currency,
        rate: parseFloat(savedRecord.rate),
        source: savedRecord.source,
        timestamp: new Date(savedRecord.timestamp),
        created_at: new Date(savedRecord.created_at)
      };
    } catch (error) {
      logger.error('Error saving exchange rate to database:', error);
      throw new Error(`Failed to save exchange rate: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      client.release();
    }
  }

  async getLatestExchangeRate(from: string, to: string, source: string): Promise<ExchangeRateRecord | null> {
    const client = await this.connection.getClient();
    
    try {
      const query = `
        SELECT id, from_currency, to_currency, rate, source, timestamp, created_at
        FROM exchange_rates
        WHERE from_currency = $1 AND to_currency = $2 AND source = $3
        ORDER BY timestamp DESC
        LIMIT 1
      `;
      
      const result = await client.query(query, [from, to, source]);
      
      if (result.rows.length === 0) {
        return null;
      }

      const record = result.rows[0];
      return {
        id: record.id,
        from_currency: record.from_currency,
        to_currency: record.to_currency,
        rate: parseFloat(record.rate),
        source: record.source,
        timestamp: new Date(record.timestamp),
        created_at: new Date(record.created_at)
      };
    } catch (error) {
      logger.error('Error getting latest exchange rate from database:', error);
      throw new Error(`Failed to get latest exchange rate: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      client.release();
    }
  }


}
