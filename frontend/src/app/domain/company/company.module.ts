import { ReactiveFormsModule } from '@angular/forms';
import { CompanyRoutingModule } from './company-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CreateComponent } from './componentes/create/create.component';
import { EditComponent } from './componentes/edit/edit.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [CompanyComponent, CreateComponent, EditComponent],
  imports: [CommonModule, CompanyRoutingModule, SharedModule, ReactiveFormsModule],
})
export class CompanyModule {}
