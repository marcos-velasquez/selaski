import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CompanyComponent } from '@domain/company/company.component';
import { CompanyService } from '@domain/company/services/company.service';
import { SnackbarService } from '@shared/material/services/snackbar.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CompanyComponent>,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      rut: ['', [Validators.required, Validators.pattern('([0-9]){7,8}-([0-9Kk]){1}')]],
      name: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.companyService.create(this.form.value).subscribe(
        () => {
          this.snackbarService.success('Compañia creada');
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
