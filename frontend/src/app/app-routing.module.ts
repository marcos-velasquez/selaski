import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './domain/auth/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./domain/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'compañias',
    loadChildren: () => import('./domain/company/company.module').then((m) => m.CompanyModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'compañia/:id',
    loadChildren: () => import('./domain/shipment/shipment.module').then((m) => m.ShipmentModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'compañias',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
