import { DisplayBuilder } from '@shared/components/table/models/display-builder.model';

export const dataDisplay = new DisplayBuilder()
  .setLabels([
    'Documento de Embarque Maestro',
    'cantidad de contenedores',
    'fecha de zarpe',
    'fecha de arribo',
    'compañia de transporte',
    'ganancia',
    'opciones',
  ])
  .setHeaders([
    'masterShippingDocument',
    'quantityOfContainers',
    'departureDate',
    'arrivalDate',
    'shippingCompany',
    'profit',
    'opciones',
  ])
  .set480(['masterShippingDocument', 'quantityOfContainers', 'opciones'])
  .set680(['masterShippingDocument', 'quantityOfContainers', 'departureDate', 'opciones'])
  .set768(['masterShippingDocument', 'quantityOfContainers', 'departureDate', 'arrivalDate', 'opciones'])
  .set1024([
    'masterShippingDocument',
    'quantityOfContainers',
    'departureDate',
    'arrivalDate',
    'shippingCompany',
    'profit',
    'opciones',
  ])
  .build();
