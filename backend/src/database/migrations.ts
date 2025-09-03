/**
 * Database migrations for PostgreSQL
 */

import { PostgresConnection } from './postgresConnection';
import logger from '../logger';

export class DatabaseMigrations {
  constructor(private connection: PostgresConnection) {}

  async runMigrations(): Promise<void> {
    const client = await this.connection.getClient();
    
    try {
      // Create migrations table if it doesn't exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS migrations (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Check which migrations have been executed
      const executedMigrations = await client.query('SELECT name FROM migrations');
      const executedNames = executedMigrations.rows.map(row => row.name);

      // Run migrations in order
      const migrations = [
        {
          name: '001_create_exchange_rates_table',
          sql: `
            CREATE TABLE IF NOT EXISTS exchange_rates (
              id SERIAL PRIMARY KEY,
              from_currency VARCHAR(10) NOT NULL,
              to_currency VARCHAR(10) NOT NULL,
              rate DECIMAL(20, 8) NOT NULL,
              source VARCHAR(50) NOT NULL,
              timestamp TIMESTAMP NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
          `
        },
        {
          name: '002_create_indexes',
          sql: `
            CREATE INDEX IF NOT EXISTS idx_exchange_rates_pair_source 
            ON exchange_rates (from_currency, to_currency, source);
            
            CREATE INDEX IF NOT EXISTS idx_exchange_rates_timestamp 
            ON exchange_rates (timestamp);
            
            CREATE INDEX IF NOT EXISTS idx_exchange_rates_latest 
            ON exchange_rates (from_currency, to_currency, source, timestamp DESC);
          `
        }
      ];

      for (const migration of migrations) {
        if (!executedNames.includes(migration.name)) {
          logger.info(`Running migration: ${migration.name}`);
          await client.query(migration.sql);
          await client.query('INSERT INTO migrations (name) VALUES ($1)', [migration.name]);
          logger.info(`Migration ${migration.name} completed`);
        }
      }

      logger.info('All migrations completed successfully');
    } catch (error) {
      logger.error('Migration failed:', error);
      throw new Error(`Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      client.release();
    }
  }
}
