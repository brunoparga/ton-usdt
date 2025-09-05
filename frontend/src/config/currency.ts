/**
 * Frontend currency configuration
 */

export interface CurrencyOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export const SUPPORTED_CURRENCIES: CurrencyOption[] = [
  { value: 'TON', label: 'TON' },
  { value: 'USDT', label: 'USDT' },
  { value: 'more', label: 'More currency pairs in the future', disabled: true }
];

export const EXCHANGE_SOURCES: CurrencyOption[] = [
  { value: 'CoinGecko', label: 'CoinGecko' },
  { value: 'more', label: 'More sources in the future', disabled: true }
];

export type Currency = 'TON' | 'USDT' | 'more';
export type TimeSelection = 'now';

export function getDefaultToCurrency(fromCurrency: Currency): Currency {
  switch (fromCurrency) {
    case 'TON':
      return 'USDT';
    case 'USDT':
      return 'TON';
    default:
      return 'USDT';
  }
}

export function getDefaultFromCurrency(toCurrency: Currency): Currency {
  switch (toCurrency) {
    case 'TON':
      return 'USDT';
    case 'USDT':
      return 'TON';
    default:
      return 'TON';
  }
}
