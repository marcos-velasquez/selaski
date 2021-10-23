import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Forwarder } from '@domain/forwarder/forwarder.entity';
import { Shipment } from '@domain/shipment/shipment.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rut: string;

  @Column()
  name: string;

  @Column()
  contactName: string;

  @Column()
  email: string;

  @Column({ default: 0 })
  profit?: number;

  @ManyToOne((type) => Forwarder, (forwarder) => forwarder.companies, { onDelete: 'CASCADE' })
  forwarder: Forwarder[];

  @OneToMany((type) => Shipment, (shipment) => shipment.company, { eager: true })
  shipments: Shipment[];
}
