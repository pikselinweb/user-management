import { Component, OnInit } from '@angular/core';
// ANGULAR FORM
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
// SERVICES
import { AuthService } from '@core/services/auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // SHOW AND HIDE PW FOR USER EXPERIENCE
  showPassword: boolean = false;
  // REGISTER FORM GROUP
  registerForm: FormGroup;
  constructor(private authService: AuthService) {
    // INIT REGISTER FORM
    this.registerForm = this.initRegisterForm;
  }

  ngOnInit(): void {}
  // REGISTER FORM PROPERTIES
  private get initRegisterForm() {
    return new FormGroup(
      {
        fullName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(30),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern(
            '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ]),
        passwordConfirm: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),

          Validators.pattern(
            '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),

          this.passwordMatchValidator(),
        ]),


      },
      { updateOn: 'blur' }
    );
  }
  // FIELD ERROR
  fieldHasError(fieldName: string): boolean {
    const formField = this.registerForm.controls[fieldName];
    return formField?.invalid && formField?.touched ? true : false;
  }
  // FIELD ERROR MESSAGE
  getErrorMessage(fieldName: string): string {
    const formField = this.registerForm.get(fieldName);
    const fieldErrors = this.registerForm.controls[fieldName].errors;
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
      : formField?.hasError('mismatch')
      ? 'Passwords mismatch'
      : 'Unknown error';
  }
  // SUBMIT REGISTER FORM
  onRegisterSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value);
    }
  }
  // CUSTOM VALIDATOR
  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordVal = this.registerForm?.get('password')?.value;
      const forbidden = control.value !== passwordVal;
      return forbidden ? { mismatch: true } : null;
    };
  }
  // MAKE LENGTH ERRORS SHORTER
  private getLengthError(fieldError: any): string {
    return `(${fieldError?.actualLength} / ${fieldError?.requiredLength})`;
  }
}
