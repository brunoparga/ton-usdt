import { ExchangeRateResponse } from '../types';
import { EXCHANGE_RATES } from '../constants';
import { validateCurrency, sanitizeCurrency } from '../validation';

export class ExchangeRateService {
  static getExchangeRate(from: string, to: string): ExchangeRateResponse {
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

    const pair = `${fromCurrency}-${toCurrency}`;
    const rate = EXCHANGE_RATES[pair];

    if (!rate) {
      throw new Error(`Exchange rate not found for ${pair}. Supported pairs: TON-USDT, USDT-TON`);
    }

    return {
      from: fromCurrency,
      to: toCurrency,
      rate: parseFloat(rate.toFixed(6)),
      source: 'CoinGecko',
      timestamp: new Date().toISOString()
    };
  }
}
