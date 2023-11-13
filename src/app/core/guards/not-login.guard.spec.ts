import { TestBed } from '@angular/core/testing';

import { NotLoginGuard } from './not-login.guard';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

describe('NotLoginGuard', () => {
  let guard: NotLoginGuard;
  let routerMock: Router;
  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree']);
    TestBed.configureTestingModule({
      providers: [CookieService, { provide: Router, useValue: routerMock }],
    });
    guard = TestBed.inject(NotLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
