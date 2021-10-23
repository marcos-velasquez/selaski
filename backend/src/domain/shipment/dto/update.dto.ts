import { Validate } from 'class-validator';
import { CreateDto } from './create.dto';
import { ExistsConstraint } from '../validators/exists.validator';

export class UpdateDto extends CreateDto {
  @Validate(ExistsConstraint)
  id: number;
}
