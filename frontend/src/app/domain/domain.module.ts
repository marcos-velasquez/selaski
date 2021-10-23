import { CompanyModule } from './company/company.module';
import { ShipmentModule } from './shipment/shipment.module';
import { AuthModule } from '@domain/auth/auth.module';
import { NgModule } from '@angular/core';

const MODULES = [AuthModule, ShipmentModule, CompanyModule];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class DomainModule {}
