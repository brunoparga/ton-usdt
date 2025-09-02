/**
 * CoinGecko API service for fetching price data
 */

import axios, { AxiosResponse } from 'axios';
import { ProviderConfig } from '../providers/baseProvider';

interface CoinGeckoResponse {
  [coinId: string]: {
    [currency: string]: number;
  };
}

export class CoinGeckoApiService {
  constructor(private config: ProviderConfig) {}

  async fetchPrice(coinId: string, vsCurrency: string): Promise<number> {
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
        throw new Error(`No price data available for ${coinId}/${vsCurrency}`);
      }

      return data[vsCurrency];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`CoinGecko API error: ${error.message}`);
      }
      throw error;
    }
  }
}
