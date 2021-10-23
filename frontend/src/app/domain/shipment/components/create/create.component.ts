import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '@shared/material/services/snackbar.service';
import { ShipmentCompanyService } from '@domain/shipment/services/shipping-company.service';
import { ShipmentService } from '@domain/shipment/services/shipment.service';
import { ShipmentComponent } from '@domain/shipment/shipment.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  shippingCompanies: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<ShipmentComponent>,
    private fb: FormBuilder,
    private shipmentService: ShipmentService,
    private snackbarService: SnackbarService,
    private shippingCompanynService: ShipmentCompanyService,
    @Inject(MAT_DIALOG_DATA) private companyId: number
  ) {}

  ngOnInit(): void {
    this.shippingCompanynService.getAll().subscribe((shippingCompanies) => {
      this.shippingCompanies = shippingCompanies;
    });

    this.form = this.fb.group({
      masterShippingDocument: ['', [Validators.required]],
      quantityOfContainers: [0, [Validators.required, Validators.min(1)]],
      departureDate: ['', [Validators.required]],
      arrivalDate: ['', [Validators.required]],
      shippingCompany: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.shipmentService.create(this.companyId, this.form.value).subscribe(
        () => {
          this.snackbarService.success('Embarque creado');
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
