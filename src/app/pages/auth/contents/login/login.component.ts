import { Component, OnInit } from '@angular/core';
// ANGULAR FORM
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// SERVICES
import { AuthService } from '@core/services/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  // INIT LOGIN FORM DIRECTLY
  loginForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(
          '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  // FIELD ERROR
  fieldHasError(fieldName: string): boolean {
    const formField = this.loginForm.controls[fieldName];
    return formField?.invalid && formField?.touched ? true : false;
  }
  // FIELD ERROR MESSAGE
  getErrorMessage(fieldName: string): string {
    const formField = this.loginForm.get(fieldName);
    const fieldErrors = this.loginForm.controls[fieldName].errors;
    return formField?.hasError('required')
      ? 'Reuired field'
      : // JSON SERVER ONLY APPLY EMAIL
      formField?.hasError('email')
      ? 'Username must be email'
      : formField?.hasError('minlength')
      ? `Input should contain at least
      ${this.getLengthError(fieldErrors?.['minlength'])} characters`
      : formField?.hasError('maxlength')
      ? `Input should contain max
      ${this.getLengthError(fieldErrors?.['maxlength'])} characters`
      : formField?.hasError('pattern')
      ? 'Password must contain one uppercase, one lowercase and one special characters of #?!@$%^&*-'
      : 'Unknown error';
  }
  // SUBMIT LOGIN FORM
  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }
  // MAKE LENGTH ERRORS SHORTER
  private getLengthError(fieldError: any): string {
    return `(${fieldError?.actualLength} / ${fieldError?.requiredLength})`;
  }
}
