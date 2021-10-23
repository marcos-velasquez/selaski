import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CompanyService } from '../company.service';

@ValidatorConstraint({ name: 'existsRut', async: true })
@Injectable()
export class ExistsRutConstraint implements ValidatorConstraintInterface {
  constructor(private companyService: CompanyService) {}

  async validate(rut: string, args: ValidationArguments) {
    const { object } = args;
    let company = await this.companyService.getOne({ rut });

    if (!Boolean(company)) {
      return true;
    }

    if (Boolean(object['id'])) {
      const companyById = await this.companyService.getOne({ id: object['id'] });

      if (companyById.id === company.id) {
        return true;
      }
    }

    return false;
  }

  defaultMessage() {
    return 'El rut ya existe';
  }
}
