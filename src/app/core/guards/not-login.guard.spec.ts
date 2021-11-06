import { TestBed } from '@angular/core/testing';

import { NotLoginGuard } from './not-login.guard';

describe('NotLoginGuard', () => {
  let guard: NotLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
