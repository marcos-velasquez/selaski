import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    if (this.authService.isLogginValue) {
      return true;
    }
    this.router.navigate(['/auth', 'login']);
    return false;
  }
}
