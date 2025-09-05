import { Currency, EXCHANGE_SOURCES } from '../config/currency';

interface ExchangeFormProps {
  exchangeSource: string;
  isLoading: boolean;
  onExchangeSourceChange: (source: string) => void;
  onSubmit: () => void;
}

export function ExchangeForm({
  exchangeSource,
  isLoading,
  onExchangeSourceChange,
  onSubmit
}: ExchangeFormProps) {
  return (
    <>
      <div className="exchange-source">
        <label htmlFor="source">Exchange Rate Source:</label>
        <select 
          id="source"
          value={exchangeSource} 
          onChange={(e) => onExchangeSourceChange(e.target.value)}
          className="source-select"
        >
          {EXCHANGE_SOURCES.map(source => (
            <option key={source.value} value={source.value} disabled={source.disabled}>
              {source.label}
            </option>
          ))}
        </select>
      </div>


      <button 
        onClick={onSubmit} 
        className="go-button"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'GO'}
      </button>
    </>
  );
}
