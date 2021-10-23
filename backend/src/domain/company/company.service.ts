import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '@domain/company/company.entity';
import { Shipment } from '@domain/shipment/shipment.entity';
import { ShipmentService } from '@domain/shipment/shipment.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private shipmentService: ShipmentService,
  ) {}

  getAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  getOne(field: Partial<Company>) {
    return this.companyRepository.findOne({ where: field });
  }

  create(company: Company) {
    return this.companyRepository.save(company);
  }

  async insert(id: number, shipment: Partial<Shipment>) {
    const company = await this.companyRepository.findOne(id);
    company.shipments.push(await this.shipmentService.create(Object.assign(new Shipment(), shipment)));
    company.profit = this.profit(company);
    return this.companyRepository.save(company);
  }

  async updateShipment(id: number, shipemnt: Partial<Shipment>) {
    await this.shipmentService.update(shipemnt.id, shipemnt);
    const company = await this.companyRepository.findOne(id);
    company.profit = this.profit(company);
    return this.companyRepository.save(company);
  }

  async deleteShipment(id: number, shipmentId: number) {
    await this.shipmentService.delete(shipmentId);
    const company = await this.companyRepository.findOne(id);
    company.profit = this.profit(company);
    return this.companyRepository.save(company);
  }

  async update(id: number, company: Partial<Company>) {
    await this.companyRepository.update(id, company);
  }

  async delete(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }

  private profit(company: Company) {
    return company.shipments.reduce((acc, shipment) => acc + shipment.profit, 0);
  }
}
