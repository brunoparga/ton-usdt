import { ExchangeRateResponse } from '../types';
import { validateCurrency, sanitizeCurrency } from '../validation';
import { CoinGeckoProvider, BaseProvider } from '../providers';
import { ExchangeRateCache } from '../cache';
import { config } from '../config';
import logger from '../logger';

export class ExchangeRateService {
  private static providers: Map<string, BaseProvider> = new Map();
  private static cache: ExchangeRateCache = new ExchangeRateCache();

  private static getProvider(providerName: string): BaseProvider {
    if (!this.providers.has(providerName)) {
      switch (providerName.toLowerCase()) {
        case 'coingecko':
          this.providers.set(providerName, new CoinGeckoProvider(config.api.coingecko));
          break;
        default:
          throw new Error(`Unsupported provider: ${providerName}`);
      }
    }
    return this.providers.get(providerName)!;
  }

  static async getExchangeRate(from: string, to: string, provider: string = 'coingecko'): Promise<ExchangeRateResponse> {
    // Validate and sanitize input
    const fromError = validateCurrency(from);
    const toError = validateCurrency(to);
    
    if (fromError) {
      throw new Error(`Invalid 'from' parameter: ${fromError}`);
    }
    
    if (toError) {
      throw new Error(`Invalid 'to' parameter: ${toError}`);
    }

    // Sanitize inputs
    const fromCurrency = sanitizeCurrency(from);
    const toCurrency = sanitizeCurrency(to);

    // Check for same currency
    if (fromCurrency === toCurrency) {
      throw new Error('From and to currencies cannot be the same');
    }

    // Check supported currency pairs
    const supportedCurrencies = ['TON', 'USDT'];
    if (!supportedCurrencies.includes(fromCurrency) || !supportedCurrencies.includes(toCurrency)) {
      throw new Error(`Unsupported currency pair: ${fromCurrency}-${toCurrency}. Supported currencies: ${supportedCurrencies.join(', ')}`);
    }

    // Check cache first
    const cacheKey = `${provider}-${fromCurrency}-${toCurrency}`;
    const cachedData = this.cache.get(provider, fromCurrency, toCurrency);
    
    if (cachedData) {
      logger.info('Cache hit', { 
        key: cacheKey, 
        provider, 
        pair: `${fromCurrency}-${toCurrency}` 
      });
      return cachedData;
    }

    logger.info('Cache miss', { 
      key: cacheKey, 
      provider, 
      pair: `${fromCurrency}-${toCurrency}` 
    });

    try {
      const providerInstance = this.getProvider(provider);
      const exchangeRate = await providerInstance.getExchangeRate(fromCurrency, toCurrency);
      
      // Store in cache
      this.cache.set(provider, fromCurrency, toCurrency, exchangeRate);
      
      logger.info('Data cached', { 
        key: cacheKey, 
        provider, 
        pair: `${fromCurrency}-${toCurrency}`,
        rate: exchangeRate.rate
      });
      
      return exchangeRate;
    } catch (error) {
      throw new Error(`Failed to fetch exchange rate: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static getCacheStats() {
    return this.cache.getStats();
  }
}
