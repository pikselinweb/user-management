import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor() {}
  // FIELD ERROR
  fieldHasError(fieldName: string, targetForm: any): boolean {
    const formField = targetForm?.controls[fieldName];
    return formField?.invalid && formField?.touched ? true : false;
  }
  // FIELD ERROR MESSAGE
  getErrorMessage(fieldName: string, targetForm: any): string {
    const formField = targetForm?.get(fieldName);
    const fieldErrors = targetForm?.controls[fieldName].errors;
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
  // MAKE LENGTH ERRORS SHORTER
  private getLengthError(fieldError: any): string {
    return `(${fieldError?.actualLength} / ${fieldError?.requiredLength})`;
  }
}
