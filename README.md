# TON USDT

A simple React application for tracking TON USDT prices with a clean, minimal interface.

## Purpose

This application provides a lightweight frontend for monitoring TON USDT cryptocurrency prices. Built with modern web technologies for fast development and deployment.

## Tech Stack

- **Frontend**: React 18 + Vite
- **Runtime**: Node.js 22 (LTS)
- **Package Manager**: npm 10

## Getting Started

### Prerequisites

- Node.js 22.x (LTS) or higher
- npm 10.x or higher

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
ton-usdt/
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main application component
│   │   ├── App.css          # Application styles
│   │   └── main.jsx         # Application entry point
│   ├── public/              # Static assets
│   ├── package.json         # Dependencies and scripts
│   └── vite.config.js       # Vite configuration
└── README.md                # This file
```

## Features

- **Currency Exchange Interface**: TON/USDT pair selection with smart switching
- **Exchange Rate Display**: Real-time rate calculation (123.45 TON/USDT)
- **Source Selection**: CoinGecko integration with extensible architecture
- **Time Selection**: Current rates with future historical data support
- **Modern React**: Built with React 18 and modern hooks
- **Fast Development**: Vite for instant hot module replacement
- **Clean UI**: Compact, professional interface

## Current Status

✅ **Frontend Complete**: React app with currency exchange interface
- TON/USDT pair selection with smart switching
- CoinGecko source integration
- Exchange rate display (123.45 TON/USDT)
- Compact, professional UI

🔄 **Next Steps**:
- Express backend API
- Real CoinGecko API integration
- In-memory caching
- Local Docker deployment
- SQLite database for historical data

## License

Unlicensed. Copyright © 2025 Bruno Parga. All rights reserved. 
