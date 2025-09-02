export interface ExchangeRateData {
  from: string;
  to: string;
  rate: number;
  source: string;
  timestamp: string;
}

export interface ProviderConfig {
  baseUrl: string;
  timeout: number;
}

export abstract class BaseProvider {
  protected config: ProviderConfig;

  constructor(config: ProviderConfig) {
    this.config = config;
  }

  abstract getExchangeRate(from: string, to: string): Promise<ExchangeRateData>;
  
  protected abstract getProviderName(): string;
}
