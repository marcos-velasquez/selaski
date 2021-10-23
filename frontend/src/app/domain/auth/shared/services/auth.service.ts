import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { environment } from '@env';
import { StorageTokenService } from './storage-token.service';
import { ForwarderLogin } from '../interfaces/auth.interface';
import { Forwarder } from '@domain/auth/shared/interfaces/forwarder.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageToken = new StorageTokenService();
  private isLoggin$: BehaviorSubject<boolean>;
  private currentProfile$: ReplaySubject<Forwarder> = new ReplaySubject();
  private endpoint = environment.API + 'auth/';

  constructor(private http: HttpClient) {
    let initialState = this.storageToken.has();

    if (initialState) {
      this.updateProfile();
    }
    this.isLoggin$ = new BehaviorSubject(initialState);
  }

  get isLogin(): Observable<boolean> {
    return this.isLoggin$.asObservable();
  }

  get isLogginValue(): boolean {
    return this.isLoggin$.value;
  }

  get currentProfile() {
    return this.currentProfile$.asObservable();
  }

  async updateProfile() {
    this.http.get<Forwarder>(this.endpoint + 'profile').subscribe((forwarder) => {
      this.currentProfile$.next(forwarder);
      this.isLoggin$.next(true);
    });
  }

  login(forwarder: ForwarderLogin) {
    return this.http.post<any>(this.endpoint + 'login', forwarder).pipe(
      tap(({ token }) => {
        this.storageToken.set(token);
        location.reload();
      })
    );
  }

  logOut(): void {
    this.storageToken.remove();
    location.reload();
  }

  register(forwarder: ForwarderLogin): Observable<string> {
    return this.http.post(this.endpoint + 'register', forwarder).pipe(pluck('message'));
  }
}
