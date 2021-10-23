import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, MinLength, Matches, Validate } from 'class-validator';
import { Regex } from '../validators/regex.validator';
import { EmailAlreadyConstraint } from '../validators/emailAlready.validator';

export class RegisterDto {
  @Validate(EmailAlreadyConstraint)
  @Matches(Regex.email, { message: 'Email (formato inválido)' })
  @IsNotEmpty({ message: 'El email es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEmail({}, { message: 'El email es inválido' })
  email: string;

  @MinLength(8, { message: 'Contraseña (Mínimo de caracteres 8)' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'La contraseña es inválida' })
  password: string;
}
