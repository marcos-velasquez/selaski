import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Shipment } from '../interfaces/shipment.interface';

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  private endpoint = environment.API;
  constructor(private http: HttpClient) {}

  getAll(companyId: number): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.endpoint + 'company/' + companyId).pipe(pluck('shipments'));
  }

  delete(companyId: number, id: number) {
    return this.http
      .delete<string>(environment.API + 'company/' + companyId + '/shipment/' + id)
      .pipe(pluck('message'));
  }

  create(companyId: number, shipment: Partial<Shipment>) {
    return this.http.post(environment.API + 'company/' + companyId + '/shipment', shipment);
  }

  edit(companyId: number, shipment: Shipment) {
    return this.http.put(environment.API + 'company/' + companyId + '/shipment', shipment).pipe(pluck('message'));
  }
}
