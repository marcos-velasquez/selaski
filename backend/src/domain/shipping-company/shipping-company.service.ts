import { Injectable } from '@nestjs/common';
import { ShippingCompany } from './shipping-company.enum';

@Injectable()
export class ShippingCompanyService {
  getAll() {
    return Object.values(ShippingCompany);
  }
}
