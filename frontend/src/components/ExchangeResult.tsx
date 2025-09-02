interface ExchangeResultProps {
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number | null;
  error: string | null;
}

export function ExchangeResult({ fromCurrency, toCurrency, exchangeRate, error }: ExchangeResultProps) {
  if (error) {
    return (
      <div className="error-display">
        <h3>Error</h3>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (exchangeRate) {
    return (
      <div className="exchange-rate-display">
        <h3>Exchange Rate</h3>
        <p className="rate-value">
          1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
        </p>
      </div>
    );
  }

  return null;
}
