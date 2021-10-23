import { Validate } from 'class-validator';
import { ExistsConstraint } from '../validators/exists.validator';

export class ExistsDto {
  @Validate(ExistsConstraint)
  id: number;
}
