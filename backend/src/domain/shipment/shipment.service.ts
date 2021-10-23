import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './shipment.entity';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
  ) {}

  getAll(): Promise<Shipment[]> {
    return this.shipmentRepository.find();
  }

  getOne(field: Partial<Shipment>) {
    return this.shipmentRepository.findOne({ where: field });
  }

  create(shipment: Shipment) {
    return this.shipmentRepository.save(shipment);
  }

  async update(id: number, shipment: Partial<Shipment>) {
    await this.shipmentRepository.update(id, shipment);
  }

  async delete(id: number): Promise<void> {
    await this.shipmentRepository.delete(id);
  }
}
