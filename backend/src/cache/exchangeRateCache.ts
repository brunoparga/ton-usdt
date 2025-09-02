import { CacheService } from './cacheService';
import { ExchangeRateData } from '../providers';

export class ExchangeRateCache {
  private cache: CacheService<ExchangeRateData>;

  constructor() {
    this.cache = new CacheService<ExchangeRateData>({
      defaultTtl: 60 * 1000, // 60 seconds
      maxSize: 100 // Store up to 100 exchange rate entries
    });
  }

  private generateKey(provider: string, from: string, to: string): string {
    return `${provider.toLowerCase()}-${from}-${to}`;
  }

  get(provider: string, from: string, to: string): ExchangeRateData | null {
    const key = this.generateKey(provider, from, to);
    return this.cache.get(key);
  }

  set(provider: string, from: string, to: string, data: ExchangeRateData): void {
    const key = this.generateKey(provider, from, to);
    this.cache.set(key, data);
  }

  has(provider: string, from: string, to: string): boolean {
    const key = this.generateKey(provider, from, to);
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }

  getStats() {
    return this.cache.getStats();
  }
}
