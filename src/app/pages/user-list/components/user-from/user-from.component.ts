import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { GlobalDataService } from '@core/services/common';
// SERVICES

import { FormValidationService } from '@core/services/form';
import { USER } from '@models/auth';
@Component({
  selector: 'user-from',
  templateUrl: './user-from.component.html',
  styleUrls: ['./user-from.component.scss'],
})
export class UserFromComponent implements OnInit {
  @Input() userData!: USER;
  readonly userRoles = [
    { val: 1, viewVal: 'User' },
    { val: 2, viewVal: 'Admin' },
    { val: 3, viewVal: 'SuberAdmin' },
  ];
  currentUser: USER | null = this.globalData.currentUser$.getValue();
  // SHOW AND HIDE PW FOR USER EXPERIENCE
  showPassword: boolean = false;
  // USER FORM GROUP
  userForm: FormGroup;
  constructor(
    private formValidationService: FormValidationService,
    private globalData: GlobalDataService
  ) {
    // INIT USER FORM
    this.userForm = this.inituserForm;
  }

  ngOnInit(): void {}
  // GET USER FORM DATA
  get getFormData() {
    return { ...this.userForm.value, role: this.userForm.value?.role || 1 };
  }
  // USER FORM PROPERTIES
  private get inituserForm() {
    return new FormGroup(
      {
        fullName: new FormControl(this.userData?.fullName || '', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ]),
        email: new FormControl(this.userData?.email || '', [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(30),
        ]),
        role: new FormControl(this.userData?.role || '', []),
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
      }
      // TODO CAN ACTIVATE FOR BETTER PERFORMANCE
      // { updateOn: 'blur' }
    );
  }
  // FIELD ERROR
  fieldHasError(fieldName: string): boolean {
    return this.formValidationService.fieldHasError(fieldName, this.userForm);
  }
  // FIELD ERROR MESSAGE
  getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(fieldName, this.userForm);
  }

  // CUSTOM VALIDATOR
  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordVal = this.userForm?.get('password')?.value;
      const forbidden = control.value !== passwordVal;
      return forbidden ? { mismatch: true } : null;
    };
  }
}
