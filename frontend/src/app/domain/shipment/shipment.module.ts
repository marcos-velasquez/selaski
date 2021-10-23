import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ShipmentRoutingModule } from './shipment-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentComponent } from './shipment.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

@NgModule({
  declarations: [ShipmentComponent, CreateComponent, EditComponent],
  imports: [CommonModule, ShipmentRoutingModule, SharedModule, ReactiveFormsModule],
})
export class ShipmentModule {}
