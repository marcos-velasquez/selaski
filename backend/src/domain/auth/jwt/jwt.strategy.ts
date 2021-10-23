import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { secret } from './../constants/jwtSecret.contant';
import { Forwarder } from '@domain/forwarder/forwarder.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      message: 'Token inválido',
    });
  }

  async validate(payload: Partial<Forwarder>) {
    return payload;
  }
}
