export interface ExchangeRateResponse {
  from: string;
  to: string;
  rate: number;
  source: string;
  timestamp: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
}

export interface ApiError {
  error: string;
}
