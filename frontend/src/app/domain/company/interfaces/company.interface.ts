import { Shipment } from '@domain/shipment/interfaces/shipment.interface';

export interface Company {
  id: number;
  rut: string;
  name: string;
  contactName: string;
  email: string;
  profit: number;
  shipments: Shipment[];
}
