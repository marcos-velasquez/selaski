import { ShippingCompanyService } from './shipping-company.service';
import { Controller, Get } from '@nestjs/common';

@Controller('shipping-company')
export class ShippingCompanyController {
  constructor(private shippingCompanyService: ShippingCompanyService) {}

  @Get()
  shippingCompanies() {
    return this.shippingCompanyService.getAll();
  }
}
