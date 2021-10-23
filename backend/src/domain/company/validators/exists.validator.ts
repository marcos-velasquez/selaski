import { NotFoundException } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CompanyService } from '@domain/company/company.service';

@ValidatorConstraint({ name: 'exists', async: true })
export class ExistsConstraint implements ValidatorConstraintInterface {
  constructor(private companyService: CompanyService) {}

  async validate(id: number, args: ValidationArguments) {
    const exists = await this.companyService.getOne({ id });

    if (!exists) {
      throw new NotFoundException('La compañia no existe');
    }
    return true;
  }
}
