import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', [
      'navigate',
      'createUrlTree',
    ]);
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatSnackBarModule],
      providers: [{ provide: Router, useValue: routerMock }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
