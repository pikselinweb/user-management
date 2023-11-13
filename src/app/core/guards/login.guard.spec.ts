import { TestBed } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { Router } from '@angular/router';

describe('LoginGuard', () => {
  let guard: LoginGuard;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree']);
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerMock }],
    });
    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
