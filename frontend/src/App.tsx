import { useState } from 'react'
import './App.css'
import { Currency, TimeSelection } from './config/currency'
import { ExchangeApiService } from './services/exchangeApi'
import { CurrencySelector } from './components/CurrencySelector'
import { ExchangeForm } from './components/ExchangeForm'
import { ExchangeResult } from './components/ExchangeResult'

function App() {
  const [fromCurrency, setFromCurrency] = useState<Currency>('TON')
  const [toCurrency, setToCurrency] = useState<Currency>('USDT')
  const [exchangeSource, setExchangeSource] = useState<string>('CoinGecko')
  const [timeSelection, setTimeSelection] = useState<TimeSelection>('now')
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const apiService = new ExchangeApiService()

  const handleCurrencySwitch = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true)
    setError(null)
    setExchangeRate(null)
    
    try {
      const data = await apiService.getExchangeRate(fromCurrency, toCurrency, exchangeSource)
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
        <CurrencySelector
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          onFromCurrencyChange={setFromCurrency}
          onToCurrencyChange={setToCurrency}
          onCurrencySwitch={handleCurrencySwitch}
        />

        <ExchangeForm
          exchangeSource={exchangeSource}
          timeSelection={timeSelection}
          isLoading={isLoading}
          onExchangeSourceChange={setExchangeSource}
          onTimeSelectionChange={setTimeSelection}
          onSubmit={handleSubmit}
        />

        <ExchangeResult
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          exchangeRate={exchangeRate}
          error={error}
        />
      </div>
    </>
  )
}

export default App
