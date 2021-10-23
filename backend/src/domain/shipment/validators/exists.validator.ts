import { NotFoundException } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ShipmentService } from '../shipment.service';

@ValidatorConstraint({ name: 'exists', async: true })
export class ExistsConstraint implements ValidatorConstraintInterface {
  constructor(private shipmentService: ShipmentService) {}

  async validate(id: number, args: ValidationArguments) {
    const exists = await this.shipmentService.getOne({ id });

    if (!exists) {
      throw new NotFoundException('La compañia no existe');
    }
    return true;
  }
}
