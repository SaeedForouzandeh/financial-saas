import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PaymentModule } from './payment/payment.module';
import { AiModule } from './ai/ai.module';
import { HrModule } from './hr/hr.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 100,
    }]),
    PrismaModule,
    AuthModule,
    PaymentModule,
    AiModule,
    HrModule,
  ],
})
export class AppModule {}