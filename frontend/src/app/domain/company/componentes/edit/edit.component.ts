import { Company } from '@domain/company/interfaces/company.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyComponent } from '@domain/company/company.component';
import { CompanyService } from '@domain/company/services/company.service';
import { SnackbarService } from '@shared/material/services/snackbar.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CompanyComponent>,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) private data: Company
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      rut: [this.data.rut, [Validators.required, Validators.pattern('([0-9]){7,8}-([0-9Kk]){1}')]],
      name: [this.data.name, [Validators.required]],
      contactName: [this.data.contactName, [Validators.required]],
      email: [this.data.email, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.value.id = this.data.id;
      this.companyService.edit(this.form.value).subscribe(
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
