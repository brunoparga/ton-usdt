import { useState } from 'react'
import './App.css'
import { 
  SUPPORTED_CURRENCIES, 
  EXCHANGE_SOURCES, 
  Currency, 
  TimeSelection,
  getDefaultToCurrency,
  getDefaultFromCurrency
} from './config/currency'

// Types
interface ExchangeRateResponse {
  from: string;
  to: string;
  rate: number;
  source: string;
  timestamp: string;
}

function App() {
  const [fromCurrency, setFromCurrency] = useState<Currency>('TON')
  const [toCurrency, setToCurrency] = useState<Currency>('USDT')
  const [exchangeSource, setExchangeSource] = useState<string>('CoinGecko')
  const [timeSelection, setTimeSelection] = useState<TimeSelection>('now')
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleCurrencySwitch = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  const handleGo = async (): Promise<void> => {
    setIsLoading(true)
    setError(null)
    setExchangeRate(null)
    
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'
      const response = await fetch(`${backendUrl}/api/exchange-rate?from=${fromCurrency}&to=${toCurrency}&provider=${exchangeSource.toLowerCase()}`)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }
      
      const data: ExchangeRateResponse = await response.json()
      setExchangeRate(data.rate)
    } catch (error) {
      console.error('Error fetching exchange rate:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch exchange rate')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <p className="app-description">Cryptocurrency Exchange Rate Tracker</p>
      <div className="card">
        <div className="currency-pair">
          <select 
            value={fromCurrency} 
            onChange={(e) => {
              const value = e.target.value as Currency
              setFromCurrency(value)
              setToCurrency(getDefaultToCurrency(value))
            }}
            className="currency-select"
          >
            {SUPPORTED_CURRENCIES.map(currency => (
              <option key={currency.value} value={currency.value} disabled={currency.disabled}>
                {currency.label}
              </option>
            ))}
          </select>
          
          <button onClick={handleCurrencySwitch} className="switch-button">
            ↻
          </button>
          
          <select 
            value={toCurrency} 
            onChange={(e) => {
              const value = e.target.value as Currency
              setToCurrency(value)
              setFromCurrency(getDefaultFromCurrency(value))
            }}
            className="currency-select"
          >
            {SUPPORTED_CURRENCIES.map(currency => (
              <option key={currency.value} value={currency.value} disabled={currency.disabled}>
                {currency.label}
              </option>
            ))}
          </select>
        </div>

        <div className="exchange-source">
          <label htmlFor="source">Exchange Rate Source:</label>
          <select 
            id="source"
            value={exchangeSource} 
            onChange={(e) => setExchangeSource(e.target.value)}
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
                onChange={(e) => setTimeSelection(e.target.value as TimeSelection)}
              />
              Now
            </label>
            <label>
              <input 
                type="radio" 
                name="time" 
                value="specific" 
                checked={timeSelection === 'specific'}
                onChange={(e) => setTimeSelection(e.target.value as TimeSelection)}
              />
              Specific Date & Time
            </label>
          </div>
          
          {timeSelection === 'specific' && (
            <p className="future-feature">Date & time selection coming in the future</p>
          )}
        </div>

        <button 
          onClick={handleGo} 
          className="go-button"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'GO'}
        </button>

        {error && (
          <div className="error-display">
            <h3>Error</h3>
            <p className="error-message">{error}</p>
          </div>
        )}

        {exchangeRate && (
          <div className="exchange-rate-display">
            <h3>Exchange Rate</h3>
            <p className="rate-value">
              1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default App
