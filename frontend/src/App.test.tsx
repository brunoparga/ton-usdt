import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from './App'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('App', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByText('Cryptocurrency Exchange Rate Tracker')).toBeInTheDocument()
  })

  it('displays currency selectors with default values', () => {
    render(<App />)
    const fromSelect = screen.getByDisplayValue('TON')
    const toSelect = screen.getByDisplayValue('USDT')
    expect(fromSelect).toBeInTheDocument()
    expect(toSelect).toBeInTheDocument()
  })

  it('switches currencies when switch button is clicked', () => {
    render(<App />)
    const switchButton = screen.getByText('↻')
    
    fireEvent.click(switchButton)
    
    expect(screen.getByDisplayValue('USDT')).toBeInTheDocument()
    expect(screen.getByDisplayValue('TON')).toBeInTheDocument()
  })

  it('updates currency selection and auto-switches the other', () => {
    render(<App />)
    const fromSelect = screen.getByDisplayValue('TON')
    
    fireEvent.change(fromSelect, { target: { value: 'USDT' } })
    
    expect(screen.getByDisplayValue('USDT')).toBeInTheDocument()
    expect(screen.getByDisplayValue('TON')).toBeInTheDocument()
  })

  it('fetches exchange rate when GO button is clicked', async () => {
    const mockResponse = {
      from: 'TON',
      to: 'USDT',
      rate: 123.45,
      source: 'CoinGecko',
      timestamp: '2025-01-02T10:00:00.000Z'
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    render(<App />)
    const goButton = screen.getByText('GO')
    
    fireEvent.click(goButton)
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/exchange-rate?from=TON&to=USDT&provider=coingecko')
    })

    await waitFor(() => {
      expect(screen.getByText('Exchange Rate')).toBeInTheDocument()
      expect(screen.getByText('1 TON = 123.450000 USDT')).toBeInTheDocument()
    })
  })

  it('handles API error gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    render(<App />)
    const goButton = screen.getByText('GO')
    
    fireEvent.click(goButton)
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/exchange-rate?from=TON&to=USDT&provider=coingecko')
    })

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument()
      expect(screen.getByText('Network error')).toBeInTheDocument()
    })

    // Should not display exchange rate on error
    expect(screen.queryByText('Exchange Rate')).not.toBeInTheDocument()
  })

  it('shows loading state when fetching', async () => {
    mockFetch.mockImplementationOnce(() => new Promise(() => {})) // Never resolves

    render(<App />)
    const goButton = screen.getByText('GO')
    
    fireEvent.click(goButton)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(goButton).toBeDisabled()
  })


  it('displays exchange source selector', () => {
    render(<App />)
    expect(screen.getByLabelText('Exchange Rate Source:')).toBeInTheDocument()
    expect(screen.getByDisplayValue('CoinGecko')).toBeInTheDocument()
  })
})
