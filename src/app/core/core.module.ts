import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COOKIE SERVICE
import { CookieService } from 'ngx-cookie-service';
// HTTP CLIENT
import { HttpClientModule } from '@angular/common/http';
// SNACKBAR MODULE FOR NOTIFICATIONS
import { MatSnackBarModule } from '@angular/material/snack-bar';
// LOADING SPINNER
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinner } from '@shared/components';
// HTTP INTERCEPTOR
import { httpInterceptorProviders } from './interceptors';
@NgModule({
  declarations: [LoadingSpinner],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    OverlayModule,
    MatProgressSpinnerModule,
  ],
  providers: [CookieService, httpInterceptorProviders],
})
export class CoreModule {}
