import { DisplayBuilder } from '@shared/components/table/models/display-builder.model';

export const dataDisplay = new DisplayBuilder()
  .setLabels(['rut', 'nombre', 'nombre de contacto', 'email', 'cantidad de embarques', 'ganancia', 'opciones'])
  .setHeaders(['rut', 'name', 'contactName', 'email', 'shipments', 'profit', 'opciones'])
  .set480(['rut', 'name', 'opciones'])
  .set680(['rut', 'name', 'contactName', 'opciones'])
  .set768(['rut', 'name', 'contactName', 'email', 'opciones'])
  .set1024(['rut', 'name', 'contactName', 'email', 'shipments', 'profit', 'opciones'])
  .build();
