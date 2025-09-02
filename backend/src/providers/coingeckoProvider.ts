import axios, { AxiosResponse } from 'axios';
import { BaseProvider, ExchangeRateData, ProviderConfig } from './baseProvider';

interface CoinGeckoResponse {
  [coinId: string]: {
    [currency: string]: number;
  };
}

export class CoinGeckoProvider extends BaseProvider {
  private readonly coinMapping: Record<string, string> = {
    'TON': 'the-open-network',
    'USDT': 'tether'
  };

  private readonly currencyMapping: Record<string, string> = {
    'USD': 'usd',
    'USDT': 'usd' // USDT is pegged to USD, so we use USD rate
  };

  constructor(config: ProviderConfig) {
    super(config);
  }

  protected getProviderName(): string {
    return 'CoinGecko';
  }

  async getExchangeRate(from: string, to: string): Promise<ExchangeRateData> {
    // For USDT to TON, we need to get TON price and invert it
    if (from === 'USDT' && to === 'TON') {
      const tonCoinId = this.coinMapping['TON'];
      const vsCurrency = this.currencyMapping['USD']; // USDT is pegged to USD
      
      if (!tonCoinId || !vsCurrency) {
        throw new Error(`Unsupported currency pair: ${from}/${to}`);
      }
      
      return this.fetchAndConvertRate(tonCoinId, vsCurrency, from, to, true);
    }
    
    // For TON to USDT, get TON price directly
    if (from === 'TON' && to === 'USDT') {
      const coinId = this.coinMapping[from];
      const vsCurrency = this.currencyMapping['USD']; // USDT is pegged to USD
      
      if (!coinId || !vsCurrency) {
        throw new Error(`Unsupported currency pair: ${from}/${to}`);
      }
      
      return this.fetchAndConvertRate(coinId, vsCurrency, from, to, false);
    }

    // For other pairs, use the original logic
    const coinId = this.coinMapping[from];
    const vsCurrency = this.currencyMapping[to];

    if (!coinId) {
      throw new Error(`Unsupported currency: ${from}`);
    }

    if (!vsCurrency) {
      throw new Error(`Unsupported target currency: ${to}`);
    }

    return this.fetchAndConvertRate(coinId, vsCurrency, from, to, false);
  }

  private async fetchAndConvertRate(
    coinId: string, 
    vsCurrency: string, 
    from: string, 
    to: string, 
    invert: boolean
  ): Promise<ExchangeRateData> {

    try {
      const response: AxiosResponse<CoinGeckoResponse> = await axios.get(
        `${this.config.baseUrl}/simple/price`,
        {
          params: {
            ids: coinId,
            vs_currencies: vsCurrency
          },
          timeout: this.config.timeout
        }
      );

      const data = response.data[coinId];
      if (!data || typeof data[vsCurrency] !== 'number') {
        throw new Error(`No price data available for ${from}/${to}`);
      }

      const rate = data[vsCurrency];
      const finalRate = invert ? 1 / rate : rate;

      return {
        from,
        to,
        rate: parseFloat(finalRate.toFixed(6)),
        source: this.getProviderName(),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`CoinGecko API error: ${error.message}`);
      }
      throw error;
    }
  }
}
