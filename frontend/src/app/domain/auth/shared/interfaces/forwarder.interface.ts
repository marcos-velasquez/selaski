import { Company } from '@domain/company/interfaces/company.interface';

export interface Forwarder {
  id: number;
  email: string;
  companies: Company[];
}
