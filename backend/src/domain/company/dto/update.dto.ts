import { CreateDto } from '@domain/company/dto';
import { Validate } from 'class-validator';
import { ExistsConstraint } from '../validators/exists.validator';

export class UpdateDto extends CreateDto {
  @Validate(ExistsConstraint)
  id: number;
}
