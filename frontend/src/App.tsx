import { useState } from 'react'
import './App.css'

// Types
interface ExchangeRateResponse {
  from: string;
  to: string;
  rate: number;
  source: string;
  timestamp: string;
}

type Currency = 'TON' | 'USDT' | 'more';
type TimeSelection = 'now' | 'specific';

function App() {
  const [fromCurrency, setFromCurrency] = useState<Currency>('TON')
  const [toCurrency, setToCurrency] = useState<Currency>('USDT')
  const [exchangeSource, setExchangeSource] = useState<string>('CoinGecko')
  const [timeSelection, setTimeSelection] = useState<TimeSelection>('now')
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)

  const handleCurrencySwitch = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  const handleGo = async (): Promise<void> => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'
      const response = await fetch(`${backendUrl}/api/exchange-rate?from=${fromCurrency}&to=${toCurrency}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: ExchangeRateResponse = await response.json()
      setExchangeRate(data.rate)
    } catch (error) {
      console.error('Error fetching exchange rate:', error)
      setExchangeRate(null)
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
              if (value === 'TON') setToCurrency('USDT')
              if (value === 'USDT') setToCurrency('TON')
            }}
            className="currency-select"
          >
            <option value="TON">TON</option>
            <option value="USDT">USDT</option>
            <option value="more" disabled>More currency pairs in the future</option>
          </select>
          
          <button onClick={handleCurrencySwitch} className="switch-button">
            ↻
          </button>
          
          <select 
            value={toCurrency} 
            onChange={(e) => {
              const value = e.target.value as Currency
              setToCurrency(value)
              if (value === 'TON') setFromCurrency('USDT')
              if (value === 'USDT') setFromCurrency('TON')
            }}
            className="currency-select"
          >
            <option value="TON">TON</option>
            <option value="USDT">USDT</option>
            <option value="more" disabled>More currency pairs in the future</option>
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
            <option value="CoinGecko">CoinGecko</option>
            <option value="more" disabled>More sources in the future</option>
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

        <button onClick={handleGo} className="go-button">
          GO
        </button>

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
