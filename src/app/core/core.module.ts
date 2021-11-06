import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COOKIE SERVICE
import { CookieService } from 'ngx-cookie-service';
// HTTP CLIENT
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [CookieService],
})
export class CoreModule {}
