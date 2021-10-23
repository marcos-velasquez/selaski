import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Forwarder } from './forwarder.entity';
import { Company } from '@domain/company/company.entity';
import { CompanyService } from '@domain/company/company.service';

@Injectable()
export class ForwarderService {
  constructor(
    @InjectRepository(Forwarder)
    private forwarderRepository: Repository<Forwarder>,
    private companyService: CompanyService,
  ) {}

  getAll(): Promise<Forwarder[]> {
    return this.forwarderRepository.find();
  }

  getOne(field: Partial<Forwarder>): Promise<Forwarder> {
    return this.forwarderRepository.findOne({ where: field });
  }

  create(forwarder: Partial<Forwarder>): Promise<Forwarder> {
    return this.forwarderRepository.save(forwarder);
  }

  async insert(id: number, company: Partial<Company>) {
    const forwarder = await this.forwarderRepository.findOne(id);
    forwarder.companies.push(await this.companyService.create(Object.assign(new Company(), company)));
    return this.forwarderRepository.save(forwarder);
  }

  async update(id: number, forwarder: Partial<Forwarder>): Promise<void> {
    await this.forwarderRepository.update(id, forwarder);
  }

  async delete(id: number): Promise<void> {
    await this.forwarderRepository.delete(id);
  }
}
