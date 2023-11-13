import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from '@core/services/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userForm = {
    email: 'Tweniee@gmail.com',
    fullName: 'Abhishek Upadhyay',
    password: 'Tweniee@123',
    passwordConfirm: 'Tweniee@123',
  };
  beforeEach(fakeAsync(() => {
    const authService = jasmine.createSpyObj('AuthService', ['register']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compileComponents();
    tick();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).withContext('should load the component').toBeTruthy();
  });

  it('should initialise the form', () => {
    expect(component.registerForm).toBeTruthy();
  });

  it('should have all the feild empty/null initially', () => {
    const { fullName, email, password, passwordConfirm } =
      component.registerForm.value;
    expect(fullName).withContext('first name should be empty string').toBe('');
    expect(email).withContext('email should be empty string').toBe('');
    expect(password).withContext('password should be empty string').toBe('');
    expect(passwordConfirm)
      .withContext('password confirm should be empty string')
      .toBe('');
  });

  it('should have validity of the form when all fields are filled correctly', () => {
    component.registerForm.patchValue({
      fullName: userForm.fullName,
      email: userForm.email,
      password: userForm.password,
      passwordConfirm: userForm.passwordConfirm,
    });
    fixture.detectChanges();
    expect(component.registerForm.valid)
      .withContext('Should give truthy is the form is valid')
      .toBeTruthy();
  });

  it('should submit the form', () => {
    spyOn(component, 'onRegisterSubmit');
    component.registerForm.patchValue({
      fullName: userForm.fullName,
      email: userForm.email,
      password: userForm.password,
      passwordConfirm: userForm.passwordConfirm,
    });
    fixture.detectChanges();
    // fixture.whenStable().then(() => {
    const element = fixture.debugElement.query(By.css('.px-5'));
    if (element) {
      const buttonElement: HTMLElement = element.nativeElement;
      buttonElement.click();
    } else {
      console.error('Element not found');
    }
    // });
    fixture.detectChanges();
    console.log(component.registerForm.value);
    expect(component.onRegisterSubmit)
      .withContext('should sumbit and trigger onRegisterSubmit method')
      .toHaveBeenCalled();
  });
});
