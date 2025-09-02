import { Currency, SUPPORTED_CURRENCIES, getDefaultToCurrency, getDefaultFromCurrency } from '../config/currency';

interface CurrencySelectorProps {
  fromCurrency: Currency;
  toCurrency: Currency;
  onFromCurrencyChange: (currency: Currency) => void;
  onToCurrencyChange: (currency: Currency) => void;
  onCurrencySwitch: () => void;
}

export function CurrencySelector({
  fromCurrency,
  toCurrency,
  onFromCurrencyChange,
  onToCurrencyChange,
  onCurrencySwitch
}: CurrencySelectorProps) {
  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Currency;
    onFromCurrencyChange(value);
    onToCurrencyChange(getDefaultToCurrency(value));
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Currency;
    onToCurrencyChange(value);
    onFromCurrencyChange(getDefaultFromCurrency(value));
  };

  return (
    <div className="currency-pair">
      <select 
        value={fromCurrency} 
        onChange={handleFromCurrencyChange}
        className="currency-select"
      >
        {SUPPORTED_CURRENCIES.map(currency => (
          <option key={currency.value} value={currency.value} disabled={currency.disabled}>
            {currency.label}
          </option>
        ))}
      </select>
      
      <button onClick={onCurrencySwitch} className="switch-button">
        ↻
      </button>
      
      <select 
        value={toCurrency} 
        onChange={handleToCurrencyChange}
        className="currency-select"
      >
        {SUPPORTED_CURRENCIES.map(currency => (
          <option key={currency.value} value={currency.value} disabled={currency.disabled}>
            {currency.label}
          </option>
        ))}
      </select>
    </div>
  );
}
