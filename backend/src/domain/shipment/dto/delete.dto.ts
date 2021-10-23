import { ExistsDto as ExistsCompanyDto } from '@domain/company/dto/exists.dto';
import { Validate } from 'class-validator';
import { ExistsDto } from './exists.dto';
export class DeleteDto extends ExistsDto {
  @Validate(ExistsCompanyDto)
  companyId: number;
}
