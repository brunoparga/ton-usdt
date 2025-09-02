import { useState } from 'react'
import './App.css'

function App() {
  const [fromCurrency, setFromCurrency] = useState('TON')
  const [toCurrency, setToCurrency] = useState('USDT')
  const [exchangeSource, setExchangeSource] = useState('CoinGecko')
  const [timeSelection, setTimeSelection] = useState('now')
  const [exchangeRate, setExchangeRate] = useState(null)

  const handleCurrencySwitch = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  const handleGo = () => {
    const tonToUsdtRate = 123.45
    const usdtToTonRate = 1 / tonToUsdtRate
    
    if (fromCurrency === 'TON' && toCurrency === 'USDT') {
      setExchangeRate(tonToUsdtRate)
    } else if (fromCurrency === 'USDT' && toCurrency === 'TON') {
      setExchangeRate(usdtToTonRate)
    } else {
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
              setFromCurrency(e.target.value)
              if (e.target.value === 'TON') setToCurrency('USDT')
              if (e.target.value === 'USDT') setToCurrency('TON')
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
              setToCurrency(e.target.value)
              if (e.target.value === 'TON') setFromCurrency('USDT')
              if (e.target.value === 'USDT') setFromCurrency('TON')
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
                onChange={(e) => setTimeSelection(e.target.value)}
              />
              Now
            </label>
            <label>
              <input 
                type="radio" 
                name="time" 
                value="specific" 
                checked={timeSelection === 'specific'}
                onChange={(e) => setTimeSelection(e.target.value)}
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
