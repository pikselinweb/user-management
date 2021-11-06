import { Injectable } from '@angular/core';
// FOR HTTP REQ
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
// FOR DIFFRENT DEPLOYMENT OPTIONS
import { environment } from '@environments/environment';
// HTTP MODELS
import { HTTP_REQ, HTTP_RES } from '@models/common';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // API URL
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  // GET REQUEST
  public async get(httpData: HTTP_REQ):Promise<HTTP_RES> {
    try {
      const httpOptions = this.generateHttpOptions(
        httpData.params,
        httpData.headers
      );
      const result: any = await this.http
        .get(`${this.apiUrl}/${httpData.url}`, httpOptions)
        .pipe(shareReplay())
        .toPromise();
      return { success: true, data: result, error: null };
    } catch (error:any) {
      return { success: false, data: null, error };
    }
  }
  // POST REQUEST
  public async post(httpData: HTTP_REQ) {
    try {
      const httpOptions = this.generateHttpOptions(
        httpData.params,
        httpData.headers
      );
      const result: any = await this.http
        .post(`${this.apiUrl}/${httpData.url}`, httpData.body, httpOptions)
        .pipe(shareReplay())
        .toPromise();
      return { success: true, data: result, error: null };
    } catch (error:any) {
      return { success: false, data: null, error };
    }
  }
  // PUT REQUEST
  public async put(httpData: HTTP_REQ) {
    try {
      const httpOptions = this.generateHttpOptions(
        httpData.params,
        httpData.headers
      );
      const result: any = await this.http
        .put(`${this.apiUrl}/${httpData.url}`, httpData.body, httpOptions)
        .pipe(shareReplay())
        .toPromise();
      return { success: true, data: result, error: null };
    } catch (error:any) {
      return { success: false, data: null, error };
    }
  }
  // DELETE REQUEST
  public async delete(httpData: HTTP_REQ) {
    try {
      const result: any = await this.http
        .delete(`${this.apiUrl}/${httpData.url}`, httpData.body)
        .pipe(shareReplay())
        .toPromise();
      return { success: true, data: result, error: null };
    } catch (error:any) {
      return { success: false, data: null, error };
    }
  }
  // DYNAMIC HTTP OPTIONS
  private generateHttpOptions(params: any, headers: any) {
    const httpOptions: any = {};
    if (params) {
      let httpParams = new HttpParams();
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          const paramValue = params[key];
          httpParams = httpParams.append(key, paramValue);
        }
      }
      httpOptions.params = httpParams;
    }
    if (headers) {
      let httpHeaders = new HttpHeaders();
      for (const key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          const headerValue = headers[key];
          httpHeaders = httpHeaders.append(key, headerValue);
        }
      }
      httpOptions.headers = httpHeaders;
    }
    return httpOptions;
  }
}
