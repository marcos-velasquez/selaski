import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';
import { secret } from './constants/jwtSecret.contant';
import { EmailAlreadyConstraint } from './validators/emailAlready.validator';
import { ForwarderModule } from '@domain/forwarder/forwarder.module';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    EmailAlreadyConstraint,
  ],
  imports: [ForwarderModule, JwtModule.register({ secret: secret })],
  controllers: [AuthController],
})
export class AuthModule {}
