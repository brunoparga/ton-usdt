/**
 * Exchange rate API service
 */

export interface ExchangeRateResponse {
  from: string;
  to: string;
  rate: number;
  source: string;
  timestamp: string;
}

export class ExchangeApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
  }

  async getExchangeRate(
    from: string, 
    to: string, 
    provider: string = 'coingecko'
  ): Promise<ExchangeRateResponse> {
    const response = await fetch(
      `${this.baseUrl}/api/exchange-rate?from=${from}&to=${to}&provider=${provider.toLowerCase()}`
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }
    
    return response.json();
  }
}
