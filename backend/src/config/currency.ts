/**
 * Currency configuration and constants
 */

export interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  isStablecoin: boolean;
  peggedTo?: string;
}

export interface CoinGeckoMapping {
  coinId: string;
  vsCurrency: string;
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  TON: {
    code: 'TON',
    name: 'The Open Network',
    symbol: 'TON',
    isStablecoin: false
  },
  USDT: {
    code: 'USDT',
    name: 'Tether USD',
    symbol: 'USDT',
    isStablecoin: true,
    peggedTo: 'USD'
  }
};

export const COINGECKO_MAPPINGS: Record<string, CoinGeckoMapping> = {
  TON: {
    coinId: 'the-open-network',
    vsCurrency: 'usd'
  },
  USDT: {
    coinId: 'tether',
    vsCurrency: 'usd'
  }
};

export const SUPPORTED_CURRENCY_CODES = Object.keys(SUPPORTED_CURRENCIES);

export const SUPPORTED_CURRENCY_PAIRS = [
  'TON-USDT',
  'USDT-TON'
];

export function isSupportedCurrency(currency: string): boolean {
  return SUPPORTED_CURRENCY_CODES.includes(currency.toUpperCase());
}

export function isSupportedPair(from: string, to: string): boolean {
  const pair = `${from.toUpperCase()}-${to.toUpperCase()}`;
  return SUPPORTED_CURRENCY_PAIRS.includes(pair);
}

export function getCurrencyConfig(currency: string): CurrencyConfig | undefined {
  return SUPPORTED_CURRENCIES[currency.toUpperCase()];
}

export function getCoinGeckoMapping(currency: string): CoinGeckoMapping | undefined {
  return COINGECKO_MAPPINGS[currency.toUpperCase()];
}
