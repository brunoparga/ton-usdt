/**
 * PostgreSQL database connection
 */

import { Pool, PoolClient } from 'pg';
import { DatabaseConnection, DatabaseConfig } from './interfaces';
import logger from '../logger';

export class PostgresConnection implements DatabaseConnection {
  private pool: Pool;
  private connected: boolean = false;

  constructor(config: DatabaseConfig) {
    this.pool = new Pool({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.username,
      password: config.password,
      ssl: config.ssl ? { rejectUnauthorized: false } : false,
      connectionTimeoutMillis: config.connectionTimeout || 5000,
      idleTimeoutMillis: 30000,
      max: 20
    });

    this.pool.on('error', (err) => {
      logger.error('PostgreSQL pool error:', err);
      this.connected = false;
    });
  }

  async connect(): Promise<void> {
    try {
      const client = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();
      this.connected = true;
      logger.info('PostgreSQL connected successfully');
    } catch (error) {
      this.connected = false;
      logger.error('Failed to connect to PostgreSQL:', error);
      throw new Error(`PostgreSQL connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.pool.end();
      this.connected = false;
      logger.info('PostgreSQL disconnected');
    } catch (error) {
      logger.error('Error disconnecting from PostgreSQL:', error);
      throw error;
    }
  }

  isConnected(): boolean {
    return this.connected;
  }

  async getClient(): Promise<PoolClient> {
    if (!this.connected) {
      throw new Error('Database not connected');
    }
    return this.pool.connect();
  }

  getPool(): Pool {
    return this.pool;
  }
}
