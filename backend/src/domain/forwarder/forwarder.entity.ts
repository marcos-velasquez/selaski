import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Company } from '@domain/company/company.entity';

@Entity()
export class Forwarder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany((type) => Company, (company) => company.forwarder, { eager: true })
  companies: Company[];
}
