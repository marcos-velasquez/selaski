import { AuthService } from './../auth.service';
import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ForwarderService } from '@domain/forwarder/forwarder.service';

@ValidatorConstraint({ name: 'emailAlready', async: true })
@Injectable()
export class EmailAlreadyConstraint implements ValidatorConstraintInterface {
  constructor(private forwarderService: ForwarderService, private auth: AuthService) {}

  async validate(email: string, args: ValidationArguments) {
    const { object } = args;
    let forwader = await this.forwarderService.getOne({ email });

    if (!Boolean(forwader)) {
      return true;
    }

    if (Boolean(object['id'])) {
      const forwarderById = await this.forwarderService.getOne({ id: object['id'] });
      if (forwarderById.email === forwader.email) {
        return true;
      }
    }

    return false;
  }

  defaultMessage() {
    return 'El email ya existe';
  }
}
