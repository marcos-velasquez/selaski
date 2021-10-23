import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Forwarder } from '@domain/forwarder/forwarder.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Partial<Forwarder>> {
    const { forwarder, message } = await this.authService.validate(email, password);
    if (!forwarder) {
      throw new BadRequestException(message);
    }
    return forwarder;
  }
}
