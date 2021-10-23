import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '@shared/material/services/snackbar.service';
import { FormValidatorService } from '@shared/services/form-validator.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  formValidator!: FormValidatorService;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.formValidator = new FormValidatorService(this.form);
  }

  onSubmit() {
    this.form.valid ? this.login() : this.formValidator.markAllAsTouched();
  }

  private login() {
    this.authService.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['']);
      },
      (message: any) => {
        this.snackbarService.error(message);
      }
    );
  }
}
