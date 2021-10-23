import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '@shared/material/services/snackbar.service';
import { CustomValidatorsService } from '../../shared/services/custom-validators.service';
import { AuthService } from '../../shared/services/auth.service';
import { FormValidatorService } from '@shared/services/form-validator.service';

@Component({
  selector: 'app-register-password',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  formValidator!: FormValidatorService;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private customValidators: CustomValidatorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: [this.customValidators.repeatPassword] }
    );

    this.formValidator = new FormValidatorService(this.form);
  }

  onSubmit() {
    this.form.valid ? this.register() : this.formValidator.markAllAsTouched();
  }

  private register() {
    const { email, password } = this.form.value;
    this.authService.register({ email, password }).subscribe(
      (message: string) => {
        this.snackbarService.success(message);
        this.router.navigate(['login']);
      },
      (message: string) => {
        this.snackbarService.error(message);
      }
    );
  }
}
