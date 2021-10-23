import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { ShipmentModule } from '@domain/shipment/shipment.module';
import { CompanyController } from './company.controller';
import { ExistsConstraint } from './validators/exists.validator';
import { ExistsRutConstraint } from './validators/exists-rut.validator';

@Module({
  imports: [ShipmentModule, TypeOrmModule.forFeature([Company])],
  providers: [CompanyService, ExistsConstraint, ExistsRutConstraint],
  exports: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
