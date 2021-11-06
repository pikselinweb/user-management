import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// SHARED MODULE
import { SharedModule } from '@shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
// AUTH LAYOUT
import { AuthComponent } from './auth.component';
// AUTH PAGES
import { LoginPage, RegisterPage } from './contents';
@NgModule({
  declarations: [AuthComponent, LoginPage, RegisterPage],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
