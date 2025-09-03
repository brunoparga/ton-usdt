import { PrismaClient, ExchangeRate } from '@prisma/client';
import { DatabaseService, ExchangeRateRecord } from './interfaces';

export class PrismaService implements DatabaseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async saveExchangeRate(record: ExchangeRateRecord): Promise<void> {
    await this.prisma.exchangeRate.create({
      data: {
        from: record.from,
        to: record.to,
        rate: record.rate,
        provider: record.provider || 'coingecko',
        timestamp: record.timestamp || new Date(),
      },
    });
  }

  async getLatestExchangeRate(from: string, to: string): Promise<ExchangeRateRecord | null> {
    const result = await this.prisma.exchangeRate.findFirst({
      where: {
        from,
        to,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    if (!result) {
      return null;
    }

    return {
      from: result.from,
      to: result.to,
      rate: result.rate,
      provider: result.provider,
      timestamp: result.timestamp,
    };
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
