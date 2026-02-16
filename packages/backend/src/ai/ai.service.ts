import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OpenAI } from 'openai';

@Injectable()
export class AIService {
  private openai: OpenAI;

  constructor(private prisma: PrismaService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async analyzeFinancialHealth(companyId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: { companyId },
      include: { entries: { include: { account: true } } },
      orderBy: { date: 'desc' },
      take: 1000
    });

    // تحلیل با OpenAI
    const analysis = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "شما یک تحلیلگر مالی حرفه‌ای هستید. بر اساس داده‌های مالی، تحلیل و پیشنهاد ارائه دهید."
        },
        {
          role: "user",
          content: `داده‌های مالی شرکت را تحلیل کن و پیشنهادات بهبود ارائه بده: ${JSON.stringify(transactions)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return {
      analysis: analysis.choices[0].message.content,
      recommendations: await this.generateRecommendations(transactions),
      riskFactors: await this.identifyRisks(transactions),
      predictions: await this.predictCashflow(transactions)
    };
  }

  async predictCashflow(transactions: any[]) {
    // استفاده از مدل‌های پیش‌بینی برای جریان نقدی
    const monthlyTotals = this.aggregateMonthlyTotals(transactions);
    
    // پیاده‌سازی مدل سری زمانی ساده
    const predictions = this.forecastNextMonths(monthlyTotals, 3);
    
    return predictions;
  }

  async generateRecommendations(transactions: any[]) {
    const prompt = `
    بر اساس این تراکنش‌ها، ۵ توصیه کلیدی برای بهبود وضعیت مالی ارائه بده:
    ${JSON.stringify(transactions.slice(0, 50))}
    `;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content.split('\n').filter(r => r.trim());
  }

  private aggregateMonthlyTotals(transactions: any[]) {
    // تجمیع ماهانه تراکنش‌ها
    const monthly = {};
    // ... پیاده‌سازی
    return monthly;
  }

  private forecastNextMonths(historicalData: any, months: number) {
    // پیاده‌سازی پیش‌بینی ساده
    // می‌توان از کتابخانه‌های تخصصی مثل Prophet استفاده کرد
    return [];
  }

  private async identifyRisks(transactions: any[]) {
    const risks = [];

    // شناسایی ریسک‌ها
    const negativeCashflow = this.checkNegativeCashflow(transactions);
    if (negativeCashflow) {
      risks.push({
        type: 'CASHFLOW',
        severity: 'HIGH',
        description: 'جریان نقدی منفی در ماه‌های اخیر'
      });
    }

    const highExpenses = this.checkHighExpenses(transactions);
    if (highExpenses) {
      risks.push({
        type: 'EXPENSES',
        severity: 'MEDIUM',
        description: 'هزینه‌ها بیش از ۷۰٪ درآمد هستند'
      });
    }

    return risks;
  }

  private checkNegativeCashflow(transactions: any[]): boolean {
    // بررسی جریان نقدی منفی
    return false; // پیاده‌سازی کامل
  }

  private checkHighExpenses(transactions: any[]): boolean {
    // بررسی هزینه‌های بالا
    return false; // پیاده‌سازی کامل
  }
}