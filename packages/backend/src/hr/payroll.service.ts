import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PayrollService {
  constructor(private prisma: PrismaService) {}

  async calculatePayroll(companyId: string, month: number, year: number) {
    const employees = await this.prisma.employee.findMany({
      where: { companyId, isActive: true }
    });

    const payrollRecords = [];

    for (const employee of employees) {
      // محاسبه حقوق پایه
      let grossSalary = employee.baseSalary;

      // محاسبه اضافه کاری
      const overtime = await this.calculateOvertime(employee.id, month, year);
      grossSalary += overtime;

      // محاسبه پاداش
      const bonus = await this.calculateBonus(employee.id, month, year);
      grossSalary += bonus;

      // محاسبه کسورات
      const tax = this.calculateTax(grossSalary);
      const insurance = this.calculateInsurance(grossSalary);
      const deductions = tax + insurance;

      // حقوق خالص
      const netSalary = grossSalary - deductions;

      const record = await this.prisma.payroll.create({
        data: {
          employeeId: employee.id,
          month,
          year,
          baseSalary: employee.baseSalary,
          overtime,
          bonus,
          tax,
          insurance,
          netSalary,
          status: 'PENDING'
        }
      });

      payrollRecords.push(record);
    }

    return payrollRecords;
  }

  private calculateTax(grossSalary: number): number {
    // محاسبه مالیات پلکانی
    if (grossSalary <= 5000000) return 0;
    if (grossSalary <= 10000000) return (grossSalary - 5000000) * 0.1;
    if (grossSalary <= 20000000) return 500000 + (grossSalary - 10000000) * 0.15;
    return 2000000 + (grossSalary - 20000000) * 0.2;
  }

  private calculateInsurance(grossSalary: number): number {
    return grossSalary * 0.07; // 7% بیمه سهم کارمند
  }

  private async calculateOvertime(employeeId: string, month: number, year: number): Promise<number> {
    // محاسبه ساعات اضافه کاری از جدول حضور و غیاب
    return 0; // پیاده‌سازی کامل
  }

  private async calculateBonus(employeeId: string, month: number, year: number): Promise<number> {
    // محاسبه پاداش بر اساس عملکرد
    return 0; // پیاده‌سازی کامل
  }
}