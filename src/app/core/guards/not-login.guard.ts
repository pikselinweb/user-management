import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
// SERVICES
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class NotLoginGuard implements CanActivate, CanLoad {
  constructor(private cookieService: CookieService, private router: Router) {}
  // CHECK IF NOT LOGGED
  get checkAuth() {
    const isNotLogged = this.cookieService.get('authToken') ? false : true;
    if (!isNotLogged) {
      return this.router.createUrlTree(['/']);
    }
    return isNotLogged;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuth;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuth;
  }
}
