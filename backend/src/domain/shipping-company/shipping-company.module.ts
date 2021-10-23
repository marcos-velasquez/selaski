import { Module } from '@nestjs/common';
import { ShippingCompanyController } from './shipping-company.controller';
import { ShippingCompanyService } from './shipping-company.service';

@Module({
  controllers: [ShippingCompanyController],
  providers: [ShippingCompanyService]
})
export class ShippingCompanyModule {}
