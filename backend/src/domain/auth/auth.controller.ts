import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SkipAuth } from './decorators/isPublic.decorator';
import { RegisterDto } from './dto/register.dto';
import { Forwarder } from '@shared/decorators/forwarder.decorator';
import { CurrentForwarder } from './interfaces/currentForwarder.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @SkipAuth()
  @Post('register')
  async create(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return 'Registrado correctamente';
  }

  @Get('profile')
  async profile(@Forwarder() { id }: CurrentForwarder) {
    return this.authService.profile(id);
  }
}
