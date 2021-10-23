import { ShipmentService } from './shipment.service';
import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ExistsDto } from './dto';

@Controller('shipment')
export class ShipmentController {
  constructor(private shipmentService: ShipmentService) {}

  @Get()
  companies() {
    return this.shipmentService.getAll();
  }
}
