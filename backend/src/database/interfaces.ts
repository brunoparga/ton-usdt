/**
 * Database interfaces for modular database implementation
 */

export interface DatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
}

export interface ExchangeRateRecord {
  id?: number;
  from_currency: string;
  to_currency: string;
  rate: number;
  source: string;
  timestamp: Date;
  created_at?: Date;
}

export interface DatabaseService {
  saveExchangeRate(record: Omit<ExchangeRateRecord, 'id' | 'created_at'>): Promise<ExchangeRateRecord>;
  getLatestExchangeRate(from: string, to: string, source: string): Promise<ExchangeRateRecord | null>;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
  connectionTimeout?: number;
}
