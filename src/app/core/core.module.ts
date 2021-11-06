import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COOKIE SERVICE
import { CookieService } from 'ngx-cookie-service';
// HTTP CLIENT
import { HttpClientModule } from '@angular/common/http';
// SNACKBAR MODULE FOR NOTIFICATIONS
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, MatSnackBarModule],
  providers: [CookieService],
})
export class CoreModule {}
