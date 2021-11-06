import { Injectable } from '@angular/core';
// TO NAVIGATE AFTER LOGIN
import { Router } from '@angular/router';
// SAVE TOKEN TO COOKIES
import { CookieService } from 'ngx-cookie-service';
// SERVICES
import { ApiService } from '../common';
import { SnackMessageService } from '../notifcation';
// MODELS
import { HTTP_REQ } from '@models/common';
import { LOGIN_FORM_DATA, REGISTER_FORM_DATA, USER } from '@models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private apiService: ApiService,
    private snackMessage: SnackMessageService
  ) {}
  // REGISTER
  async register(formData: REGISTER_FORM_DATA) {
    delete formData.passwordConfirm;
    const httpData: HTTP_REQ = {
      url: 'register',
      body: { ...formData, role: 1 },
    };
    const { success, data, error } = await this.apiService.post(httpData);
    if (success && data?.accessToken) {
      this.setCookiesAndNavigate(data?.accessToken, formData?.email);
    } else {
      this.snackMessage.show({
        message: error?.message || 'Failure during register',
      });
    }
  }
  // LOGIN
  async login(formData: LOGIN_FORM_DATA) {
    const httpData: HTTP_REQ = { url: 'login', body: formData };
    const { success, data, error } = await this.apiService.post(httpData);
    if (success && data?.accessToken) {
      this.setCookiesAndNavigate(data?.accessToken, formData?.email);
    } else {
      this.snackMessage.show({
        message: error?.message || 'Failure during login',
      });
    }
  }
  async userProfile(): Promise<USER | null> {
    const userMail = this.cookieService.get('email');
    const httpData: HTTP_REQ = { url: 'users', params: { email: userMail } };
    const { success, error, data } = await this.apiService.get(httpData);
    if (success && data?.length > 0) {
      const userInfo: USER = data[0];
      // ! FALLOWING OPERATION MUST BE IN BACKEND
      delete userInfo.password;
      return userInfo;
    } else {
      this.snackMessage.show({
        message: error?.message || 'Failure during get profile',
      });
      return null;
    }
  }
  // LOGOUT
  logOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/auth']);
  }
  private setCookiesAndNavigate(oAuthToken: string, email: string) {
    // JSON-SERVER TOKEN EXPIRES IN 1 HOUR
    const expires = this.expireTime1Hour;
    this.cookieService.set('authToken', oAuthToken, {
      path: '/',
      expires,
    });
    this.cookieService.set('email', email, { path: '/', expires });
    this.router.navigate(['']);
  }
  // GET NEXT 1 HOUR
  private get expireTime1Hour() {
    const dNow = new Date();
    let dTime = dNow.getTime();
    dTime += 3600 * 1000;
    dNow.setTime(dTime);
    return dNow;
  }
}
