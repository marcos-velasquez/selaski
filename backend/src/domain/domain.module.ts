import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { ForwarderModule } from './forwarder/forwarder.module';
import { ShipmentModule } from './shipment/shipment.module';
import { ShippingCompanyModule } from './shipping-company/shipping-company.module';

const MODULES = [
  AuthModule,
  ForwarderModule,
  CompanyModule,
  ShipmentModule,
  ShippingCompanyModule,
];

@Module({
  imports: MODULES,
  exports: MODULES,
})
export class DomainModule {}
