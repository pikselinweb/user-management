import { AuthService } from '@core/services/auth';
import { AdminGuard } from './admin.guard';
import { PROFILE } from '@models/auth';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

describe('AdminGuard', () => {
  let profile: PROFILE = {
    id: 123,
    userId: 'user123',
    fullName: 'John Doe',
    role: 2,
    email: 'john@example.com',
  };
  let profileFalse: PROFILE = {
    id: 123,
    userId: 'user123',
    fullName: 'John Doe',
    role: 1,
    email: 'john@example.com',
  };
  let adminAuth: AdminGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let routerMock: Router;
  beforeEach(() => {
    {
      authService = jasmine.createSpyObj('AuthService', ['userProfile']);
      routerMock = jasmine.createSpyObj('Router', [
        'navigate',
        'createUrlTree',
      ]);
      adminAuth = new AdminGuard(authService, routerMock);
    }
  });
  it('Should login is auth is true', async () => {
    authService.userProfile.and.returnValue(
      new Promise((resolve) => {
        resolve(profile);
      })
    );
    const result = await adminAuth.canActivate(new ActivatedRouteSnapshot(), <
      RouterStateSnapshot
    >{ url: 'testUrl' });

    expect(result).toBe(true);
  });
});
