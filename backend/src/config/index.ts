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
  }
};
