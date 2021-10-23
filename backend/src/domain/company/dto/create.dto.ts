import { Regex } from '@domain/auth/validators/regex.validator';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, Validate } from 'class-validator';
import { ExistsRutConstraint } from './../validators/exists-rut.validator';

export class CreateDto {
  @Validate(ExistsRutConstraint)
  @Matches(Regex.rut, { message: 'Rut (formato inválido)' })
  @IsNotEmpty({ message: 'El rut es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El rut es inválido' })
  rut: string;

  @IsNotEmpty({ message: 'El nombre es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre es inválido' })
  name: string;

  @IsNotEmpty({ message: 'El nombre de contacto es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre de contacto es inválido' })
  contactName: string;

  @Matches(Regex.email, { message: 'Email (formato inválido)' })
  @IsNotEmpty({ message: 'El email es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEmail({}, { message: 'El email es inválido' })
  email: string;
}
