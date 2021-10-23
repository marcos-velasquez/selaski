import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ForwarderService } from '@domain/forwarder/forwarder.service';
import { compareSync } from 'bcryptjs';
import { Forwarder } from '@domain/forwarder/forwarder.entity';

@Injectable()
export class AuthService {
  constructor(private forwarderService: ForwarderService, private jwtService: JwtService) {}

  async validate(email, password) {
    const user = await this.forwarderService.getOne({ email });

    if (!user) {
      return { user: null, message: 'El usuario no existe' };
    }

    if (!compareSync(password, user.password)) {
      return { user: null, message: 'La contraseña es incorrecta' };
    }

    return { forwarder: { id: user.id } };
  }

  async login(payload: Partial<Forwarder>) {
    return {
      token: this.jwtService.sign(payload),
      message: 'Logeado correctamente',
    };
  }

  profile(id: number) {
    return this.forwarderService.getOne({ id });
  }

  register(user: Partial<Forwarder>) {
    return this.forwarderService.create(user);
  }
}
