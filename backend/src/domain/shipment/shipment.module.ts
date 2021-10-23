import { ExistsConstraint } from './validators/exists.validator';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentService } from './shipment.service';
import { Shipment } from '@domain/shipment/shipment.entity';
import { ShipmentSubscriber } from './shipment.subscriber';
import { ShipmentController } from './shipment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment])],
  providers: [ShipmentService, ShipmentSubscriber, ExistsConstraint],
  exports: [ShipmentService],
  controllers: [ShipmentController],
})
export class ShipmentModule {}
