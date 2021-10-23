export interface Shipment {
  id: number;
  profit: number;
  masterShippingDocument: string;
  quantityOfContainers: number;
  departureDate: string;
  arrivalDate: string;
  shippingCompany: string;
}
