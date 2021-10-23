import { RegisterComponent } from './pages/register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LayoutComponent } from './shared/layout/layout.component';
import { HTTP_JWT_INTERCEPTOR } from './shared/interceptors/jwt.interceptor';
import { LoginGuard } from './shared/guards/login.guard';
import { TogglePasswordDirective } from './shared/directives/toggle-password.directive';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, TogglePasswordDirective, LayoutComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
  providers: [HTTP_JWT_INTERCEPTOR, LoginGuard],
})
export class AuthModule {}
