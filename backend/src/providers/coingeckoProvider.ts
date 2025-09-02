import { BaseProvider, ExchangeRateData, ProviderConfig } from './baseProvider';
import { isSupportedCurrency } from '../config/currency';
import { RateConversionService } from '../services/rateConversionService';
import { CoinGeckoApiService } from '../services/coinGeckoApiService';

export class CoinGeckoProvider extends BaseProvider {
  private rateConversionService: RateConversionService;
  private apiService: CoinGeckoApiService;

  constructor(config: ProviderConfig) {
    super(config);
    this.rateConversionService = new RateConversionService();
    this.apiService = new CoinGeckoApiService(config);
  }

  protected getProviderName(): string {
    return 'CoinGecko';
  }

  async getExchangeRate(from: string, to: string): Promise<ExchangeRateData> {
    // Validate currencies are supported
    if (!isSupportedCurrency(from) || !isSupportedCurrency(to)) {
      throw new Error(`Unsupported currency pair: ${from}/${to}`);
    }

    // Get API parameters for the currency pair
    const { coinId, vsCurrency } = this.rateConversionService.getCoinGeckoParams(from, to);
    
    // Fetch raw price from CoinGecko
    const rawRate = await this.apiService.fetchPrice(coinId, vsCurrency);
    
    // Convert rate using appropriate strategy
    const finalRate = this.rateConversionService.convertRate(from, to, rawRate);

    return {
      from,
      to,
      rate: parseFloat(finalRate.toFixed(6)),
      source: this.getProviderName(),
      timestamp: new Date().toISOString()
    };
  }
}
