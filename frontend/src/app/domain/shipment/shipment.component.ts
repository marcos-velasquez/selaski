import { Shipment } from '@domain/shipment/interfaces/shipment.interface';
import { Component, AfterViewInit } from '@angular/core';
import { dataDisplay } from './constants/table-data-display.constant';
import { MatDialog } from '@angular/material/dialog';
import { ShipmentService } from './services/shipment.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss'],
})
export class ShipmentComponent implements AfterViewInit {
  private companyId: number;
  shipments: Shipment[];
  dataDisplay = dataDisplay;

  constructor(
    private dialog: MatDialog,
    private shipmentService: ShipmentService,
    private activedRoute: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.activedRoute.params.subscribe(({ id }) => {
      this.companyId = id;
      this.setData();
    });
  }

  private setData = (hasNew = true) => {
    if (hasNew) {
      this.shipmentService.getAll(this.companyId).subscribe((shipments) => {
        this.shipments = shipments;
      });
    }
  };

  create() {
    this.dialog.open(CreateComponent, { data: this.companyId }).afterClosed().subscribe(this.setData);
  }

  edit(shipment: Shipment): void {
    this.dialog
      .open(EditComponent, { data: { shipment, companyId: this.companyId } })
      .afterClosed()
      .subscribe(this.setData);
  }

  delete(shipment: Shipment): void {
    Swal.fire({
      title: '¿Estás segur@?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.shipmentService.delete(this.companyId, shipment.id).subscribe(() => this.setData());
      }
    });
  }
}
