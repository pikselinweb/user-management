import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// EXTRA MATERIAL MODULES
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
// SHARED MODULE
import { SharedModule } from '@shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
// COMPONENTS
import { PagesComponent } from './pages.component';
import { Navbar } from '@shared/components';
//PAGES
import { HomeComponent as HomePage } from './home/home.component';
import { UserListComponent as UserListPage } from './user-list/user-list.component';

@NgModule({
  declarations: [PagesComponent, Navbar, HomePage, UserListPage],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    SharedModule,
    PagesRoutingModule,
  ],
})
export class PagesModule {}
