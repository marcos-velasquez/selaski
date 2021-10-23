import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Shipment } from '@domain/shipment/interfaces/shipment.interface';
import { ShipmentService } from '@domain/shipment/services/shipment.service';
import { ShipmentCompanyService } from '@domain/shipment/services/shipping-company.service';
import { ShipmentComponent } from '@domain/shipment/shipment.component';
import { SnackbarService } from '@shared/material/services/snackbar.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  form: FormGroup;
  shippingCompanies: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<ShipmentComponent>,
    private fb: FormBuilder,
    private shipmentService: ShipmentService,
    private snackbarService: SnackbarService,
    private shippingCompanynService: ShipmentCompanyService,
    @Inject(MAT_DIALOG_DATA) private data: { companyId: number; shipment: Shipment }
  ) {}

  ngOnInit(): void {
    this.shippingCompanynService.getAll().subscribe((shippingCompanies) => {
      this.shippingCompanies = shippingCompanies;
    });

    this.form = this.fb.group({
      masterShippingDocument: [this.data.shipment.masterShippingDocument, [Validators.required]],
      quantityOfContainers: [this.data.shipment.quantityOfContainers, [Validators.required, Validators.min(1)]],
      departureDate: [this.data.shipment.departureDate, [Validators.required]],
      arrivalDate: [this.data.shipment.arrivalDate, [Validators.required]],
      shippingCompany: [this.data.shipment.shippingCompany, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.value.id = this.data.shipment.id;
      this.shipmentService.edit(this.data.companyId, this.form.value).subscribe(
        (message: string) => {
          this.snackbarService.success(message);
          this.dialogRef.close(true);
        },
        (message: string) => {
          this.snackbarService.error(message);
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
