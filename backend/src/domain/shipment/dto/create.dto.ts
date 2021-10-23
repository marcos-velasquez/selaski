import { ShippingCompany } from './../../shipping-company/shipping-company.enum';
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateDto {
  @IsNotEmpty({ message: 'El documento de embarque maestro es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El documento de embarque maestro es inválido' })
  masterShippingDocument: string;

  @Min(0, { message: 'La cantidad de contenedores debe ser mayor a 0' })
  @IsInt({ message: 'La cantidad de contenedores es inválida' })
  quantityOfContainers: number;

  @IsDateString({}, { message: 'La fecha de zarpe es inválida' })
  departureDate: string;

  @IsDateString({}, { message: 'La fecha de arribo es inválida' })
  arrivalDate: string;

  @IsEnum(ShippingCompany, { message: 'La compañia de transporte es inválida' })
  shippingCompany: ShippingCompany;
}
