/**
 * Rate conversion service for handling currency pair calculations
 */

import { getCoinGeckoMapping } from '../config/currency';

export interface RateConversionStrategy {
  convert(from: string, to: string, rawRate: number): number;
}

export class DirectRateStrategy implements RateConversionStrategy {
  convert(from: string, to: string, rawRate: number): number {
    return rawRate;
  }
}

export class InvertedRateStrategy implements RateConversionStrategy {
  convert(from: string, to: string, rawRate: number): number {
    return 1 / rawRate;
  }
}

export class RateConversionService {
  private strategies: Map<string, RateConversionStrategy> = new Map();

  constructor() {
    this.strategies.set('TON-USDT', new DirectRateStrategy());
    this.strategies.set('USDT-TON', new InvertedRateStrategy());
  }

  getStrategy(from: string, to: string): RateConversionStrategy {
    const pair = `${from}-${to}`;
    const strategy = this.strategies.get(pair);
    
    if (!strategy) {
      throw new Error(`No conversion strategy found for pair: ${pair}`);
    }
    
    return strategy;
  }

  convertRate(from: string, to: string, rawRate: number): number {
    const strategy = this.getStrategy(from, to);
    return strategy.convert(from, to, rawRate);
  }

  getCoinGeckoParams(from: string, to: string): { coinId: string; vsCurrency: string } {
    // For TON/USDT pairs, we always fetch TON price in USD
    if ((from === 'TON' && to === 'USDT') || (from === 'USDT' && to === 'TON')) {
      const tonMapping = getCoinGeckoMapping('TON');
      if (!tonMapping) {
        throw new Error(`CoinGecko mapping not found for TON`);
      }
      return tonMapping;
    }

    // For other pairs, use the from currency mapping
    const fromMapping = getCoinGeckoMapping(from);
    if (!fromMapping) {
      throw new Error(`CoinGecko mapping not found for ${from}`);
    }
    return fromMapping;
  }
}
