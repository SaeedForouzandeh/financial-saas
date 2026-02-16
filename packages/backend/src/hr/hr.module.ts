import { Module } from '@nestjs/common';
import { PayrollService } from './payroll.service';

@Module({
  providers: [PayrollService],
  exports: [PayrollService],
})
export class HrModule {}