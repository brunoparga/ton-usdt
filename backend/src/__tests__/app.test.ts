import request from 'supertest';
import { createApp } from '../app';

describe('App', () => {
  const app = createApp();

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
      expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
    });
  });

  describe('GET /api/exchange-rate', () => {
    it('should return TON to USDT exchange rate', async () => {
      const response = await request(app)
        .get('/api/exchange-rate?from=TON&to=USDT')
        .expect(200);

      expect(response.body).toEqual({
        from: 'TON',
        to: 'USDT',
        rate: expect.any(Number),
        source: 'CoinGecko',
        timestamp: expect.any(String)
      });
      expect(response.body.rate).toBeGreaterThan(0);
    });

    it('should return USDT to TON exchange rate', async () => {
      const response = await request(app)
        .get('/api/exchange-rate?from=USDT&to=TON')
        .expect(200);

      expect(response.body).toEqual({
        from: 'USDT',
        to: 'TON',
        rate: expect.any(Number),
        source: 'CoinGecko',
        timestamp: expect.any(String)
      });
      expect(response.body.rate).toBeGreaterThan(0);
    });

    it('should return 400 when missing `from` parameter', async () => {
      const response = await request(app)
        .get('/api/exchange-rate?to=USDT')
        .expect(400);

      expect(response.body).toEqual({
        error: 'Missing required parameters: from and to'
      });
    });

    it('should return 400 when missing `to` parameter', async () => {
      const response = await request(app)
        .get('/api/exchange-rate?from=TON')
        .expect(400);

      expect(response.body).toEqual({
        error: 'Missing required parameters: from and to'
      });
    });

    it('should return 400 for invalid currency format', async () => {
      const response = await request(app)
        .get('/api/exchange-rate?from=ton&to=usdt')
        .expect(400);

      expect(response.body.error).toContain('Invalid');
    });

    it('should return 400 for same currency', async () => {
      const response = await request(app)
        .get('/api/exchange-rate?from=TON&to=TON')
        .expect(400);

      expect(response.body).toEqual({
        error: 'From and to currencies cannot be the same'
      });
    });

    it('should return 400 for unsupported currency pair', async () => {
      const response = await request(app)
        .get('/api/exchange-rate?from=BTC&to=ETH')
        .expect(400);

      expect(response.body.error).toContain('Unsupported currency pair: BTC-ETH');
    });

    it('should return 400 when both parameters are missing', async () => {
      const response = await request(app)
        .get('/api/exchange-rate')
        .expect(400);

      expect(response.body).toEqual({
        error: 'Missing required parameters: from and to'
      });
    });
  });

  describe('CORS', () => {
    it('should include CORS headers', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.headers['access-control-allow-origin']).toBe('*');
    });
  });
});
