export const config = {
  server: {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development'
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  },
  api: {
    coingecko: {
      baseUrl: 'https://api.coingecko.com/api/v3',
      timeout: 5000 // 5 seconds
    }
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'ton_usdt',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    ssl: process.env.DB_SSL === 'true',
    connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '5000')
  }
};
