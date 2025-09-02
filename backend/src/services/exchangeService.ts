import { ExchangeRateResponse } from '../types';
import { validateCurrency, sanitizeCurrency } from '../validation';
import { CoinGeckoProvider, BaseProvider } from '../providers';
import { config } from '../config';

export class ExchangeRateService {
  private static providers: Map<string, BaseProvider> = new Map();

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

    try {
      const providerInstance = this.getProvider(provider);
      return await providerInstance.getExchangeRate(fromCurrency, toCurrency);
    } catch (error) {
      throw new Error(`Failed to fetch exchange rate: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
