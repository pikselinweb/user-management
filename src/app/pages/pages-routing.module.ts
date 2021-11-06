import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// PARENT
import { PagesComponent } from './pages.component';
// PAGES
import { HomeComponent as HomePage } from './home/home.component';
import { UserListComponent as UserListPage } from './user-list/user-list.component';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      // SET DEFAULT  PAGE
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      // PAGES
      { path: 'home', component: HomePage },
      { path: 'user-list', component: UserListPage },
      // WRONG URL REDIRECT TO HOME
      { path: '**', redirectTo: 'home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
