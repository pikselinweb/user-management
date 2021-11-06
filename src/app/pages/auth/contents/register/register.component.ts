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
import { FormValidationService } from '@core/services/form';
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
  constructor(
    private authService: AuthService,
    private formValidationService: FormValidationService
  ) {
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
    return this.formValidationService.fieldHasError(
      fieldName,
      this.registerForm
    );
  }
  // FIELD ERROR MESSAGE
  getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(
      fieldName,
      this.registerForm
    );
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
}
