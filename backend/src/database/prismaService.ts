import { PrismaClient, ExchangeRate } from '@prisma/client';
import { DatabaseService, ExchangeRateRecord } from './interfaces';

export class PrismaService implements DatabaseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async saveExchangeRate(record: Omit<ExchangeRateRecord, 'id' | 'created_at'>): Promise<ExchangeRateRecord> {
    const result = await this.prisma.exchangeRate.create({
      data: {
        from: record.from_currency,
        to: record.to_currency,
        rate: record.rate,
        provider: record.source,
        timestamp: record.timestamp,
      },
    });

    return {
      id: result.id,
      from_currency: result.from,
      to_currency: result.to,
      rate: result.rate,
      source: result.provider,
      timestamp: result.timestamp,
      created_at: result.timestamp,
    };
  }

  async getLatestExchangeRate(from: string, to: string, source: string): Promise<ExchangeRateRecord | null> {
    const result = await this.prisma.exchangeRate.findFirst({
      where: {
        from,
        to,
        provider: source,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    if (!result) {
      return null;
    }

    return {
      id: result.id,
      from_currency: result.from,
      to_currency: result.to,
      rate: result.rate,
      source: result.provider,
      timestamp: result.timestamp,
      created_at: result.timestamp,
    };
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
