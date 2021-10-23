import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '@domain/company/company.entity';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  profit: number;

  @Column()
  masterShippingDocument: string;

  @Column()
  quantityOfContainers: number;

  @Column()
  departureDate: string;

  @Column()
  arrivalDate: string;

  @Column()
  shippingCompany: string;

  @ManyToOne((type) => Company, (company) => company.shipments, { onDelete: 'CASCADE' })
  company: Company[];
}
