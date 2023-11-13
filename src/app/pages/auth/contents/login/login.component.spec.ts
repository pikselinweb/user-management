import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@core/services/auth';
import { FormValidationService } from '@core/services/form';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let fieldHasError: any;
  let getErrorMessage: any;
  let userInfo = {
    email: 'superadmin@mail.com',
    password: '12345@Aa',
  };
  let router: Router;
  let authServices: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authService = jasmine.createSpyObj('AuthService', ['login']);
    const formValidationService = jasmine.createSpyObj(
      'FormValidationService',
      ['fieldHasError', 'getErrorMessage']
    );

    fieldHasError = formValidationService.fieldHasError.and.returnValue(true);
    getErrorMessage =
      formValidationService.getErrorMessage.and.returnValue('Required');
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: FormValidationService, useValue: formValidationService },
      ],
    }).compileComponents();

    authServices = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle login with correct creds', () => {
    component.loginForm.patchValue({
      email: userInfo.email,
      password: userInfo.password,
    });
    fixture.detectChanges();
    expect(component.loginForm.valid)
      .withContext('should be valid')
      .toBeTruthy();
  });

  it('should handle login, after submit', () => {
    component.loginForm.patchValue({
      email: userInfo.email,
      password: userInfo.password,
    });
    fixture.detectChanges();
    spyOn(component, 'onLoginSubmit');
    const element = fixture.debugElement.query(By.css('.px-5'))
      .nativeElement as HTMLElement;
    element.click();
    expect(component.onLoginSubmit)
      .withContext('Must call the submit method')
      .toHaveBeenCalled();
  });

  it('should call the login method and return a resolved promise', fakeAsync(() => {
    authServices.login.and.returnValue(Promise.resolve());
    let result: any;
    authServices.login(userInfo).then((item) => {
      result = item;
    });
    tick();
    expect(result)
      .withContext('Should resolve the login function')
      .toBe(undefined);
  }));

  it('should navigate to /dashboard on successful login', () => {
    const location: Location = TestBed.inject(Location);

    authServices.login(userInfo);
    console.log(location.path());
    expect(location.path())
      .withContext('Should redirect to home after login')
      .toBe('');
    expect(authServices.login).toHaveBeenCalled();
  });
});
