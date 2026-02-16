import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      sub: user.id, 
      email: user.email,
      role: user.role 
    };
    
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    };
  }

  async generateTwoFactorSecret(userId: string) {
    const secret = authenticator.generateSecret();
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    
    const otpauth = authenticator.keyuri(user.email, 'FinancialSaaS', secret);
    const qrCode = await toDataURL(otpauth);
    
    await this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorSecret: secret }
    });

    return { secret, qrCode };
  }
}