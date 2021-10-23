import { Controller, Delete, Get, Param, Put, Body, Post } from '@nestjs/common';
import { CompanyService } from '@domain/company/company.service';
import { ExistsDto, UpdateDto } from './dto';
import { CreateDto, UpdateDto as UpadateShipmentDto, DeleteDto } from '@domain/shipment/dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post(':id/shipment')
  async insert(@Body() shipment: CreateDto, @Param() company: ExistsDto) {
    return this.companyService.insert(company.id, shipment);
  }

  @Put(':id/shipment')
  async updateShipment(@Body() shipment: UpadateShipmentDto, @Param() company: ExistsDto) {
    await this.companyService.updateShipment(company.id, shipment);
    return 'Embarque actualizado';
  }

  @Delete(':companyId/shipment/:id')
  async deleteShipment(@Param() { id, companyId }: DeleteDto) {
    await this.companyService.deleteShipment(companyId, id);
    return 'Embarque eliminado';
  }

  @Get()
  companies() {
    return this.companyService.getAll();
  }

  @Get(':id')
  company(@Param() { id }: ExistsDto) {
    return this.companyService.getOne({ id });
  }

  @Put()
  async update(@Body() company: UpdateDto) {
    await this.companyService.update(company.id, company);
    return 'Compañia actualizada';
  }

  @Delete(':id')
  async delete(@Param() { id }: ExistsDto) {
    await this.companyService.delete(id);
    return 'Compañia eliminada';
  }
}
