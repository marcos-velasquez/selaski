import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { Company } from '../interfaces/company.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private endpoint = environment.API;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Company[]> {
    return this.http.get<Company[]>(this.endpoint + 'forwarder/current').pipe(pluck('companies'));
  }

  delete(id: number) {
    return this.http.delete<string>(this.endpoint + 'company/' + id).pipe(pluck('message'));
  }

  create(company: Partial<Company>) {
    return this.http.post<Company>(environment.API + 'forwarder/company', company);
  }

  edit(company: Company) {
    return this.http.put<string>(environment.API + 'company', company).pipe(pluck('message'));
  }
}
