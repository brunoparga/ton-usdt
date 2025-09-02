import { Currency, TimeSelection, EXCHANGE_SOURCES } from '../config/currency';

interface ExchangeFormProps {
  exchangeSource: string;
  timeSelection: TimeSelection;
  isLoading: boolean;
  onExchangeSourceChange: (source: string) => void;
  onTimeSelectionChange: (selection: TimeSelection) => void;
  onSubmit: () => void;
}

export function ExchangeForm({
  exchangeSource,
  timeSelection,
  isLoading,
  onExchangeSourceChange,
  onTimeSelectionChange,
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

      <div className="time-selection">
        <div className="radio-group">
          <label>
            <input 
              type="radio" 
              name="time" 
              value="now" 
              checked={timeSelection === 'now'}
              onChange={(e) => onTimeSelectionChange(e.target.value as TimeSelection)}
            />
            Now
          </label>
          <label>
            <input 
              type="radio" 
              name="time" 
              value="specific" 
              checked={timeSelection === 'specific'}
              onChange={(e) => onTimeSelectionChange(e.target.value as TimeSelection)}
            />
            Specific Date & Time
          </label>
        </div>
        
        {timeSelection === 'specific' && (
          <p className="future-feature">Date & time selection coming in the future</p>
        )}
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
